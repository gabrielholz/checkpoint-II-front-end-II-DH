let formTask = document.querySelector("form");

function loadDataUser() {
  const storageUser = JSON.parse(localStorage.getItem('user'))
  document.getElementById('user-name').innerHTML = `${storageUser.firstName} ${storageUser.lastName}`
}

function loadTasks() {
  const tokenLogin = localStorage.getItem('tokenLogin')
  let settings = {
    method: "GET",
    headers: {
      authorization: tokenLogin,
    }
  }

  fetch(urlApi + 'tasks', settings).then((response) => {

    return response.json()
  })
  .then((list) => {
    let listTasks = ``
    let listTasksFinished = ``
    for (let i = 0; i < list.length; i++) {
      let created = new Date(list[i].createdAt)

      if (list[i].completed) {
        listTasksFinished += `
      <li class="tarefa">
      <button onClick={refreshTask(${list[i].id})} class={btn-finished}>   <div class="not-done"></div></button>
        <div class="descricao">
          <p class="nome">${list[i].description}</p>
          <p class="timestamp">Criada em: ${created.toLocaleDateString()}</p>
           </div>
           <button onClick={deleteTask(${list[i].id})}><img src="./assets/lixeira.png" width="20px" height="20px"/></button>
         
      </li>
      `
      }
      else {
        listTasks += `
        <li class="tarefa">
  
        <button onClick={refreshTask(${list[i].id})} class={btn-finished}>  <div class="not-done"></div></button>
         
            <div class="descricao">
                <p class="nome">${list[i].description}</p>
                <p class="timestamp">Criada em: ${created.toLocaleDateString()}</p>
            </div>
          <button onClick={deleteTask(${list[i].id})}><img src="./assets/lixeira.png" width="20px" height="20px"/></button>
           
        </li>
        `
      }
    }

    document.getElementById("list-tasks").innerHTML = listTasks;
    document.getElementById("list-tasks-finished").innerHTML = listTasksFinished;

  }).catch((error) => console.log(error))

}

formTask.addEventListener("submit", function (event) {
  event.preventDefault();

  let text = formTask["novaTarefa"].value

  let task = {
    description: text,
    completed: false
  }

  if (text) createTasks(task);

})


function createTasks(dataTask) {

  const tokenLogin = localStorage.getItem('tokenLogin')
  let settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: tokenLogin,
    }, body: JSON.stringify(dataTask)
  }

  fetch(`${urlApi}tasks`, settings)
    .then((response) => {
      if (response.status === 201) {
        loadTasks()
      }
    }).catch((error) =>
      console.log(error)
    )
}


function deleteTask(idTask) {
  const tokenLogin = localStorage.getItem('tokenLogin')
  let settings = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: tokenLogin,

    }
  }
  fetch(`${urlApi}tasks/${idTask}`, settings)
    .then((response) => {
      if (response.status === 200) {
        loadTasks()
      }
    }).catch((error) =>
      console.log(error)
    )
}


//atualizar tarefa
function refreshTask(idTask) {
  const tokenLogin = localStorage.getItem('tokenLogin')
  let task = getTask(tokenLogin, idTask);
  let settings = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: tokenLogin,

    }, body: JSON.stringify({ tescription: task.description, completed: true })
  }

  fetch(`${urlApi}tasks/${idTask}`, settings)
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        loadTasks()
      }
    }).catch((error) =>
      console.log(error)
    )

}


async function getTask(tokenUser, idTask) {

  let settings = {
    method: "GET",
    headers: {
      authorization: tokenUser,
    }
  }
  await fetch(`${urlApi}tasks/${idTask}`, settings).then((response) => {
    return response.json()
  }).catch((error) => { console.log(error) })
}

loadTasks()
loadDataUser()