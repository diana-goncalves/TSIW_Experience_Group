import * as User from "../models/UserModel.js"
import {init as initColectibles, getCollectibles} from "../models/collectiblesModel.js";

let user = User.getUserLogged();
let username = user.username;

// Collectibles
initColectibles();
let collectibles = getCollectibles();
const totalCollectibles = collectibles.length;
let userCollectibles = user.collectibles;

if (user.username === "admin") {
    location.href = "../../html/admin.html";
}

if(user) {
    
    // Mudar username
    document.querySelector(".headerAccount").innerHTML = 
    `
        ${user.username} 
        ${selectUserIcon(user)}
        
    `;

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

document.querySelector("#colecionaveisHeader").innerHTML += `  ${userCollectibles.length}/${totalCollectibles}`;

function renderCollectibles() {
    const catalog = document.querySelector("#colecionaveisCatalog");

    collectibles.forEach(item => {        
        let img = document.createElement('img');
        const path = item.img.replace("../", "");
        img.src = path;
        img.width = 100;
        img.height = 100;
        img.alt = item.name;
        img.id = item.name;
        
        // Caso o utilizador não tenha encontrado o colecionavel aplicar filtro preto e branco
        if (userCollectibles.includes(item.name)) {
            img.className = 'perfilCollectibleUnlocked';
        } else {
            img.className = 'perfilCollectibleLocked';
        }

        catalog.appendChild(img);
       
    })
}

// Collectibles

function customToast(message) {
    
    document.querySelector("#perfilToastbody").textContent = message;

    var toast = new bootstrap.Toast(document.querySelector("#perfilToast"));

    toast.show();
}

function selectUserIcon(user) {
    // Collectibles
    const totalCollectibles = collectibles.length;
    let userCollectibles = user.collectibles;
    if (user.victory) {
        if (totalCollectibles == userCollectibles) {
            return `<img src="../../media/img/ER-assets/allCollectiblesAward.svg" width="64px" height="64px" alt="Award">`;
        }else{
            return `<i class="fa-solid fa-medal" style="color: var(--color-yellow)"></i>`;
        }
    }else{
        return "";
    }
}


// Iniciar

User.init()
submitForm();
userData(User.getUserLogged());
editPassword();
renderCollectibles();


