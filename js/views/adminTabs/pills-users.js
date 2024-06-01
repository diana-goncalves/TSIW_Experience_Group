import * as User from "../../models/UserModel.js"

// Iniciar
renderTableUsers(User.getUsers());

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
                <td style="text-align:center;">${user.id}</td>
                <td>${user.username}</td>
                <td style="text-align: center;">      
                    <button class="btn remove" id="${user.username}" type="button" style="border-radius: 0;">
                        Remover
                    </button>
                </td>
            </tr>
        `
    });

    // Clicar no botão remover USER

    const btnsRemove = document.getElementsByClassName("remove");

    for (const button of btnsRemove) {
        button.addEventListener("click", () => {
            if(confirm("Queres mesmo remover o utilizador?")) {
                console.log(button.id);
                User.removeUser(button.id);
                renderTableUsers(User.getUsers());
            }
        })
    }

}

// Procurar user pelo nome automatico
const filterInputUsers = document.querySelector("#procuraUser");

filterInputUsers.addEventListener("input", () => {
    renderTableUsers(User.getUsers(filterInputUsers.value));
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


