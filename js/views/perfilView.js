import * as User from "../models/UserModel.js"
import {init, getInventoryCollectibles, getCollectibles} from "../models/collectiblesModel.js";

let estadoUser = User.getUserLogged();
let username = estadoUser.username;

if (estadoUser.username === "admin") {
    location.href = "../../html/admin.html";
}

if(estadoUser) {
    
    // Mudar username
    document.querySelector(".headerAccount").innerHTML = `${estadoUser.username}`;

    // Logout
    document.querySelector(".logoutButton").addEventListener("click", event => {
        event.preventDefault()

        if (confirm("Queres mesmo terminar sessão?")) {
            
            User.logout()
            
            location.href = "../../index.html";
            
        }
    })

} else {
    alert("Tens que fazer login primeiro!")
    
    location.href = "../../html/login.html";

}

// form

function submitForm() {
    
    const form = document.querySelector("#formPerfil");

    form.addEventListener("submit",(event) => {
        event.preventDefault();

        // Guardar valores dos inputs
        const userData = {
            firstName: document.querySelector("#formPrimeiroNome").value,
            lastName: document.querySelector("#formApelido").value,
            birthdate: document.querySelector("#formDataNascimento").value,
            location: document.querySelector("#formLocalidade").value, 
            gender: document.querySelector("#formGenero").value

        }
        
        updateUser(username,userData);

    });    
    
}

function updateUser(username, userData) {
    try {
        User.editUser(username, userData);
        customToast("Dados editados com sucesso!");
    } catch (error) {
        customToast(error.message);
    } 
}

// Esta função vai buscar os dados do user que já existem e coloca-os no form.
function userData(user) {
    
    if (user.firstName) {
        document.querySelector("#formPrimeiroNome").value = user.firstName;
    }
    if (user.lastName) {
        document.querySelector("#formApelido").value = user.lastName;
    }
    if (user.location) {
        document.querySelector("#formLocalidade").value = user.location;
    }
    if (user.gender) {
        document.querySelector("#formGenero").value = user.gender;
    }
    if (user.birthdate) {
        document.querySelector("#formDataNascimento").value = user.birthdate;
    }

}

function editPassword() {

    const user = User.getUserLogged();
    const form = document.querySelector("#formPassword");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const passwordTxt = document.querySelector("#formNovaPass").value;
        const confirmar = document.querySelector("#formConfirmar").value;

        if (passwordTxt === confirmar) {
            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                birthdate: user.birthdate,
                location: user.location, 
                gender: user.gender,
                password: passwordTxt
    
            }

            updateUser(user.username, userData);
            customToast("Palavra-passe editada com sucesso!");

        } else {
            alert("erro");
        }
    })
}

// form

function customToast(message) {
    
    document.querySelector("#perfilToastbody").textContent = message;

    var toast = new bootstrap.Toast(document.querySelector("#perfilToast"));

    toast.show();
}

// Iniciar

User.init()
submitForm();
userData(User.getUserLogged());
editPassword();

