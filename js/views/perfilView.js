import * as User from "../models/UserModel.js"

User.init()


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
    
    location.href = "../../html/login.html";

}
