let formulario = document.querySelector("form");


document.getElementById('botao').disabled = true
document.getElementById('botao').style.backgroundColor = 'gray'
document.getElementById('inputEmail' && 'inputPassword').addEventListener('input', function habilita(event){
 event.preventDefault();
 let email = formulario["email"].value.split(" ").join("").trim();
let password = formulario["password"].value.split(" ").join("").trim();

  if(email !== null || password !== null || email !== "" || password !== ""){
    document.getElementById('botao').disabled = false
    document.getElementById('botao').style.backgroundColor = ''
  }
  else{
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
    }
  }

  function verificaSenha() {
    if (password == "") {
      errouSenha.style.display = "block";
      document.getElementById("inputPassword").style.borderColor = "red";
    } else {
      errouSenha.style.display = "none";
      document.getElementById("inputPassword").style.borderColor = "";
    }
  }
  verificaEmail();
  verificaSenha();

  console.log(email)
});