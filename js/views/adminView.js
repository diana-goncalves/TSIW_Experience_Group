import * as User from "../models/UserModel.js"

// Ajustar dinamicamente margem entre navbar e resto da página

const nav = document.querySelector("#navbarNav");

const alturaNav = nav.clientHeight;

const container = document.querySelector("#wrapperContainer");

container.style.marginTop = alturaNav + 'px';




let estadoUser = User.getUserLogged();

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
    
    setTimeout(() => {
        location.href = "../../html/login.html";
    }, 500);
}
