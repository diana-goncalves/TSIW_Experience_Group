import * as User from "../models/UserModel.js"

User.init()

// Array que guarda os userss
let users = User.users;
// User que está logado
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

    
    // Admin dashboard
    
    if(estadoUser.id === 1) {
        
        // Adicionar utilizadores à tabela de Users

        users.forEach(user => {
            document.querySelector("#table-Users").innerHTML += 
            `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.id}</td>
                    <td style="text-align: center;">
                        
                        <div class="dropdown">
                            
                            <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="color:var(--color-yellow);border:0;">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>

                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Remover</a></li>
                                <li><a class="dropdown-item" href="#">Bloquear</a></li>
                            </ul>

                        </div>
                       
                    </td>
                </tr>
            `
        });
       
    }

    // Admin dashboard

} else {
    alert("Tens que fazer login primeiro!")
    
    // setTimeout(() => {
    //     location.href = "../../html/login.html";
    // }, 500);
    location.href = "../../html/login.html";

}
