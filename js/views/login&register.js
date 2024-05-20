import * as User from "../models/UserModel.js";
 
// script para o botão remember me
let lembrar = false;

 document.addEventListener('DOMContentLoaded', function () {
    const rememberMeButton = document.querySelector('#lembrarBTN')
    const customCheckbox = document.getElementById('checkbox')

rememberMeButton.addEventListener('click', function () {
    customCheckbox.checked = !customCheckbox.checked
    rememberMeButton.classList.toggle('checked', customCheckbox.checked)

    // Guardar estado do botão 

    if (lembrar) {
        lembrar = false;
    } else {
        lembrar = true;
    }

})
})

// script para mudar entre iniciar sessão e criar conta

document.querySelector("#criarButton").addEventListener('click', MudarParaRegister)

document.querySelector("#loginButton").addEventListener('click', MudarParaLogin)

function MudarParaLogin() {
    document.querySelector("#loginForm").style.display = 'block';
    document.querySelector("#registerForm").style.display = 'none';
}

function MudarParaRegister() {
    document.querySelector("#loginForm").style.display = 'none';
    document.querySelector("#registerForm").style.display = 'block';
}


// form e submit de users

const loginForm =  document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

User.init()

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const valorNomeRegister = document.querySelector("#inputNomeUtilizadorRegister").value;
    const valorPasseRegister = document.querySelector("#InputPasswordRegister").value;

    User.add(valorNomeRegister, valorPasseRegister);
    MudarParaLogin();
})

loginForm.addEventListener("submit", event => {
    event.preventDefault();

    const valorNomeLogin = document.querySelector("#inputNomeUtilizador").value;
    const valorPasseLogin = document.querySelector("#InputPassword1").value;
    
    User.login(valorNomeLogin,valorPasseLogin,lembrar)
})