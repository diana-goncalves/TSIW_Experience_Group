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
                                <li><a class="dropdown-item remove" id="${user.username}" href="#">Remover</a></li>
                                <li><a class="dropdown-item bloquear">Bloquear</a></li>
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


// Clicar no botão remover USER

const btnsRemove = document.getElementsByClassName("remove");

for (const button of btnsRemove) {
    button.addEventListener("click", () => {
        if(confirm("Queres mesmo remover o utilizador?")) {
            User.removeUser(button.id);
            location.reload();
        }
    })
}

// Clicar no botão bloquear USER - PARA JÁ FAZ O MESMO QUE O BOTÃO REMOVER

const btnsBloquear = document.getElementsByClassName("bloquear");

for (const button of btnsBloquear) {
    button.addEventListener("click", () => {
        if(confirm("Queres mesmo bloquear o utilizador?")) {
            User.removeUser(button.id);
            location.reload();
        }
    })
}