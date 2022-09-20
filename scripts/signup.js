let formulario = document.querySelector("form");

let urlApi = "https://ctd-todo-api.herokuapp.com/v1/"

document.getElementById("botao").disabled = true;
document.getElementById("botao").style.backgroundColor = "gray";
document
  .getElementById(
    "nome" && "sobrenome" && "email" && "password" && "password-repeat"
  )
  .addEventListener("input", function habilita(event) {
    event.preventDefault();
    let nome = formulario["nome"].value;
    let sobrenome = formulario["sobrenome"].value;
    let email = formulario["email"].value;
    let password = formulario["password"].value.split(" ").join("").trim();
    let passworRepeat = formulario["password-repeat"].value
      .split(" ")
      .join("")
      .trim();

    if (
      nome !== null ||
      sobrenome !== null ||
      email !== null ||
      password !== null ||
      passworRepeat !== null ||
      nome !== "" ||
      sobrenome !== "" ||
      email !== "" ||
      password !== "" ||
      passworRepeat !== ""
    ) {
      document.getElementById("botao").disabled = false;
      document.getElementById("botao").style.backgroundColor = "";
    } else {
      document.getElementById("botao").disabled = true;
      document.getElementById("botao").style.backgroundColor = "gray";
    }
  });

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  let nome = formulario["nome"].value;
  let sobrenome = formulario["sobrenome"].value;
  let email = formulario["email"].value;
  let password = formulario["password"].value.split(" ").join("").trim();
  let passworRepeat = formulario["password-repeat"].value
    .split(" ")
    .join("")
    .trim();

  console.log("esse é a senha: " + password);
  console.log(nome);

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  validateEmail(email);

  function verificaNome() {
    if (nome == "") {
      document.getElementById("nome-error").style.display = "block";
      document.getElementById("nome").style.borderColor = "red";
      return false;
    } else {
      document.getElementById("nome-error").style.display = "none";
      document.getElementById("nome").style.borderColor = "";
      return true;
    }
  }

  function verificaSobrenome() {
    if (sobrenome == "") {
      document.getElementById("sobrenome-error").style.display = "block";
      document.getElementById("sobrenome").style.borderColor = "red";
      return false;
    } else {
      document.getElementById("sobrenome-error").style.display = "none";
      document.getElementById("sobrenome").style.borderColor = "";
      return true;
    }
  }

  function verificaEmail() {
    if (email == "") {
      document.getElementById("email-error").style.display = "block";
      document.getElementById("email").style.borderColor = "red";
      return false;
    } else {
      document.getElementById("email-error").style.display = "none";
      document.getElementById("email").style.borderColor = "";
      return true;
    }
  }

  function verificaSenha() {
    if (password == "") {
      document.getElementById("senha-error").style.display = "block";
      document.getElementById("password").style.borderColor = "red";
      return false;
    } else {
      document.getElementById("senha-error").style.display = "none";
      document.getElementById("password").style.borderColor = "";
      return true;
    }
  }

  function verificaSenhaRepete() {
    if (passworRepeat == "" || passworRepeat !== password) {
      document.getElementById("senha-repeat-error").style.display = "block";
      document.getElementById("password-repeat").style.borderColor = "red";
      return false;
    } else {
      document.getElementById("senha-repeat-error").style.display = "none";
      document.getElementById("password-repeat").style.borderColor = "";
      return true;
    }
  }

  if (
    verificaNome() &&
    verificaSobrenome() &&
    verificaEmail() &&
    verificaSenha() &&
    verificaSenhaRepete()
  ) {
    let data = { firstName: nome, lastName: sobrenome, email: email, password: password }
    createUser(data)
  }
});

function createUser(data) {

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

  fetch(urlApi + 'users', settings).then((response) => {
    console.log((response));
    // console.log(response)
    // 200	- Operación Exitosa. Retorna un JWT
    // 400	- Contraseña incorrecta
    // 404	- El usuario não existe
    // 500	- Erro del servidor
    return response.json()
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