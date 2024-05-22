import * as User from "../models/UserModel.js"

User.init()

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

        renderTableUsers(User.getUsers());
       
    }

    // Admin dashboard

} else {
    alert("Tens que fazer login primeiro!")
    
    // setTimeout(() => {
    //     location.href = "../../html/login.html";
    // }, 500);
    location.href = "../../html/login.html";

}

function renderTableUsers(users = []) {
    
    const tabelaUsers = document.querySelector("#table-Users");
    
    // Limpar tabela primeiro
    tabelaUsers.innerHTML = "";
    
    // Caso não encontre users ( filtro não encontra nenhum nome igual )
    if (users.length === 0) {
        tabelaUsers.innerHTML = 
        `
            <tr>
                <td colspan="3" style="text-align:center;">Não foram encontrados utilizadores!</td>
            </tr>
        `
        return;
    }
    
    users.forEach(user => {
        tabelaUsers.innerHTML += 
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

}

// Clicar no botão filtrar

// guardar estado do botão
let isFiltered = false;

const filterInputUsers = document.querySelector("#procuraUser");
const filterButtonUsers = document.querySelector("#btnFiltroUser");

filterButtonUsers.addEventListener("click", () => {
    
    // Se já tiver filtrado, limpa o input e carrega a tabela outra vez com todos os users
    if (isFiltered) {
        filterInputUsers.value = "";
        renderTableUsers(User.getUsers());
        filterButtonUsers.textContent = "Filtrar";
    } 
    // Carregar tabela só com os users que correspondem ao filtro
    else {
        renderTableUsers(User.getUsers(filterInputUsers.value));
        filterButtonUsers.textContent = "Limpar";
    }

    // mudar estado do botão
    isFiltered = !isFiltered;

})

// Clicar no botão organizar
let isSorted = false;
const orderButtonUsers = document.querySelector("#btnOrderUser");

orderButtonUsers.addEventListener("click", () => {
    
    if(isSorted) {
        // Caso já tenham clicado para organizar, tirar o sort
        renderTableUsers(User.getUsers(filterInputUsers.value));
    } else {
        // Organizar a lista de users filtrados, se não houver filtros organiza APENAS a tabela
        renderTableUsers(User.sortUsers(User.getUsers(filterInputUsers.value)));
    }
    
    isSorted = !isSorted;
})