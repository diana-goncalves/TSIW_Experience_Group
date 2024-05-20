import * as User from "../models/UserModel.js";
 
// script para o botão remember me

 document.addEventListener('DOMContentLoaded', function () {
    const rememberMeButton = document.querySelector('#lembrarBTN')
    const customCheckbox = document.getElementById('checkbox')

rememberMeButton.addEventListener('click', function () {
    customCheckbox.checked = !customCheckbox.checked
    rememberMeButton.classList.toggle('checked', customCheckbox.checked)
})
})

// script para mudar entre iniciar sessão e criar conta

document.querySelector("#criarButton").addEventListener('click', function () {
    document.querySelector("#loginForm").style.display = 'none';
    document.querySelector("#registerForm").style.display = 'block';
})

document.querySelector("#loginButton").addEventListener('click', function () {
    document.querySelector("#loginForm").style.display = 'block';
    document.querySelector("#registerForm").style.display = 'none';
})

// form e submit de users

const loginForm =  document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

User.init()

registerForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const valorNomeRegister = document.querySelector("#inputNomeUtilizadorRegister").value;
    const valorPasseRegister = document.querySelector("#InputPasswordRegister").value;

    User.add(valorNomeRegister,valorPasseRegister);
})