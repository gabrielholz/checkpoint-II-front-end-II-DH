let formulario = document.querySelector("form");

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
    } else {
      document.getElementById("nome-error").style.display = "none";
      document.getElementById("nome").style.borderColor = "";
    }
  }

  function verificaSobrenome() {
    if (sobrenome == "") {
      document.getElementById("sobrenome-error").style.display = "block";
      document.getElementById("sobrenome").style.borderColor = "red";
    } else {
      document.getElementById("sobrenome-error").style.display = "none";
      document.getElementById("sobrenome").style.borderColor = "";
    }
  }

  function verificaEmail() {
    if (email == "") {
      document.getElementById("email-error").style.display = "block";
      document.getElementById("email").style.borderColor = "red";
    } else {
      document.getElementById("email-error").style.display = "none";
      document.getElementById("email").style.borderColor = "";
    }
  }

  function verificaSenha() {
    if (password == "") {
      document.getElementById("senha-error").style.display = "block";
      document.getElementById("password").style.borderColor = "red";
    } else {
      document.getElementById("senha-error").style.display = "none";
      document.getElementById("password").style.borderColor = "";
    }
  }

  function verificaSenhaRepete() {
    if (passworRepeat == "" || passworRepeat !== password) {
      document.getElementById("senha-repeat-error").style.display = "block";
      document.getElementById("password-repeat").style.borderColor = "red";
    } else {
      document.getElementById("senha-repeat-error").style.display = "none";
      document.getElementById("password-repeat").style.borderColor = "";
    }
  }

  verificaNome();
  verificaSobrenome();
  verificaEmail();
  verificaSenha();
  verificaSenhaRepete();
});
