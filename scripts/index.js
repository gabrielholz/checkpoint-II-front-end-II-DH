let formulario = document.querySelector("form");
let urlApi = "https://ctd-fe2-todo-v2.herokuapp.com/v1/";



document.getElementById('botao').disabled = true
document.getElementById('botao').style.backgroundColor = 'gray'
document.getElementById('inputEmail' && 'inputPassword').addEventListener('input', function habilita(event) {
  event.preventDefault();
  let email = formulario["email"].value.split(" ").join("").trim();
  let password = formulario["password"].value.split(" ").join("").trim();

  if (email !== null || password !== null || email !== "" || password !== "") {
    document.getElementById('botao').disabled = false
    document.getElementById('botao').style.backgroundColor = ''
  }
  else {
    document.getElementById('botao').disabled = true
    document.getElementById('botao').style.backgroundColor = 'gray'
  }
})


formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  let email = formulario["email"].value.split(" ").join("").trim();
  let password = formulario["password"].value.split(" ").join("").trim();

  let errouEmail = document.getElementById("email-error");
  let errouSenha = document.getElementById("password-error");


  //esta função valida o email
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  validateEmail(email);

  function verificaEmail() {
    if (email == "" || validateEmail(email) == false) {
      errouEmail.style.display = "block";
      document.getElementById("inputEmail").style.borderColor = "red";
    } else {
      errouEmail.style.display = "none";
      document.getElementById("inputEmail").style.borderColor = "";
      return true
    }
  }

  function verificaSenha() {
    if (password == "") {
      errouSenha.style.display = "block";
      document.getElementById("inputPassword").style.borderColor = "red";
    } else {
      errouSenha.style.display = "none";
      document.getElementById("inputPassword").style.borderColor = "";
      return true;
    }
  }

  if (verificaEmail() && verificaSenha()) {
    login(email, password)
  } else {
    console.log("error")
  }


});

function login(email, password) {
  let data = {
    "email": email,
    "password": password

  }
  let settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Connection": "keep-alive",
      "alg": "HS256",
      "typ": "JWT"


    },
    body: JSON.stringify(data)
  }

  fetch(urlApi + 'users/login', settings).then((response) => {
    console.log((response));
    if (response.status === 404) {
      document.getElementById("inputPassword").style.borderColor = "red";
      document.getElementById("inputEmail").style.borderColor = "red";
      document.getElementById("incorrect-error").style.display = "block";
    }else{
      return response.json()
    }
    
  }).then(body => {
    let tokenLogin = body.jwt;
    localStorage.setItem('tokenLogin', tokenLogin)

    return tokenLogin;

  }).then(async (token) => {
    await storageUser(token)
    if (token !== null) window.location.href = "/tarefas.html";
  }).catch((error) => console.log(error))

}

async function storageUser(tokenLogin) {


  let settings = {
    method: "GET",
    headers: {
      authorization: tokenLogin,
    }
  }

 await fetch(urlApi + 'users/getme', settings).then((response) => {

    return response.json()
  }).then((dataUser) => {

    localStorage.setItem('user', JSON.stringify(dataUser));

  }).catch((error) => console.log(error))


}

function logout() {
  localStorage.clear()
  window.location.href = "/index.html";
}
