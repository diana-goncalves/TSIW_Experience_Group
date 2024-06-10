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
    customToast("Conta criada com sucesso, não te esqueças de fazer login!")
    MudarParaLogin();
})


loginForm.addEventListener("submit", event => {
    event.preventDefault();

    const valorNomeLogin = document.querySelector("#inputNomeUtilizador").value;
    const valorPasseLogin = document.querySelector("#InputPassword1").value;
    
    try {
        
        User.login(valorNomeLogin,valorPasseLogin,lembrar)
        
        customToast("Agora já podes entrar na nossa escape room!")

        showModal();

        // Caso não clique em nenhuma opção levar para o index
        // setTimeout(() => {
        //     location.href = "../../index.html";
        // }, 5000);
    } 
     catch (error) {
        customToast("Não foi possivel iniciar sessão!")
    }
    
})

function customToast(message) {
    
    document.querySelector("#loginToast").textContent = message;

    var toast = new bootstrap.Toast(document.querySelector("#alertToast"));

    toast.show();
}

function showModal() {
    let modalBody = document.querySelector("#modalLoginBody");
    let html = null;

    html =
    `
        <div class="row custom-border m-0" style="padding:2rem;">
            <div class="row">
                <h1>Agora que já iniciaste sessão...</h1>
                <span>Podes ir diretamente para à nossa Escape Room ou ir ao teu perfil para completares as tuas informações pessoais e ganhares uma recompensa.</span>
            </div>
            <div class="row">
                <div class="col-12 d-flex justify-content-around align-items-center" style="height: 100px;">
                    <a href="../../html/Escape Room/entrada.html" class="btnGuardar" id="modalLoginER" style="width:10rem;text-decoration:none;text-align:center;">Escape Room</a>
                    <a href="../../html/account.html" class="btnGuardar" id="modalLoginPerfil" style="width:10rem;text-decoration:none;text-align:center;">Perfil</a>
                </div>
            </div>
        </div>
        
    `
    
    modalBody.innerHTML = `${html}`

    $("#loginModal").modal("show");

}