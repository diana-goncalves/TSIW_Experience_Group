import * as User from "../../models/UserModel.js"

function renderTableUsers(users = []) {
    
    const tabelaUsers = document.querySelector("#table-Users");
    
    // Limpar tabela primeiro
    tabelaUsers.innerHTML = "";
    
    // Caso não encontre users ( filtro não encontra nenhum nome igual )
    if (users.length === 0) {
        tabelaUsers.innerHTML = 
        `
            <tr>
                <td colspan="8" style="text-align:center;">Não foram encontrados utilizadores!</td>
            </tr>
        `
        return;
    }
    
    users.forEach(user => {
        
        let gender = null;

        switch (user.gender) {
            case "M":
                gender = "Masculino";
                break;
        
            case "F":
                gender = "Feminino";
                break;
            case "O":
                gender = "Outro";
                break;
            default:
                break;
        }
        
        tabelaUsers.innerHTML += 
        `
            <tr>
                <td style="text-align:center;">${user.id}</td>
                <td>${user.username}</td>
                <td>${user.firstName ? user.firstName : "N/A"}</td>
                <td>${user.lastName  ? user.lastName : "N/A"}</td>
                <td>${user.location ? user.location : "N/A"}</td>
                <td>${gender ? gender : "N/A"}</td>
                <td>${user.birthdate ? user.birthdate : "N/A"}</td>
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
                User.removeUser(button.id);
                renderTableUsers(User.getUsers());
            }
        })
    }

    tableHeaders();

}

// Procurar user pelo nome automatico
const filterInputUsers = document.querySelector("#procuraUser");

filterInputUsers.addEventListener("input", () => {
    renderTableUsers(User.getUsers(filterInputUsers.value));
})


// Organizar colunas da tabela
let headersEvents = false;
function tableHeaders() {
    
    // Evitar colocar event listeners 2x
    if (headersEvents) {
        return;
    } 

    headersEvents = true;
    
    // Clicar nos headers da tabela para organizar linhas
    let isSorted = false;
    const tHeader = document.querySelector("#tHeadUsers");
    const tHeaders = tHeader.querySelectorAll("th");
    
    tHeaders.forEach(header => {
        const headerIndex = parseInt(header.getAttribute("id"));

        // Excluir coluna com botão para gerir users e ID de user
        if (headerIndex != 7 && headerIndex != 0) {
            header.style.cursor = "pointer"; // Mudar cursor para indicar elemento "clicavel"
        
            header.addEventListener("click", () => {
                isSorted = !isSorted;
                sortTable(headerIndex, isSorted);
            })
        }

    });    
}

let original = null;
function sortTable(colIndex, isSorted) {

    let users = User.getUsers();

    if ( original === null) {
        // Criar uma cópia dos users antes de organizar
        original = users.slice();
    }

    // Voltar à ordem original
    if (!isSorted) {
        renderTableUsers(original);
        return;
    }

   users.sort((a,b) => {
    let aContent = null;
    let bContent = null;

    switch (colIndex) {
        case 1:
            // Coluna username
            aContent = a.username;
            bContent = b.username;

            break;
        case 2:
            // Coluna primeiro nome
            aContent = a.firstName ? a.firstName : "N/A";
            bContent = b.firstName ? b.firstName : "N/A";
            
            break;
        case 3:
            // Coluna apelido
            aContent = a.lastName ? a.lastName : "N/A";
            bContent = b.lastName ? b.lastName : "N/A";
            
            break;
        case 4:
            // Coluna localidade
            aContent = a.location ? a.location : "N/A";
            bContent = b.location ? a.location : "N/A";
            
            break;
        case 5:
            // Coluna género
            aContent = a.gender ? a.gender : "N/A";
            bContent = b.gender ? a.gender : "N/A";
            
            break;
        case 6:
            // Coluna data de nascimento, foi necessario converter para string para conseguir comparar com as linhas que não têm data
            aContent = a.birthdate ? new Date(a.birthdate).toISOString() : "N/A";
            bContent = b.birthdate ? new Date(b.birthdate).toISOString() : "N/A";
            
            break;
        default:
            return 0;
    }
    
    if (typeof aContent === "string" || typeof bContent === "string") {
        aContent = aContent.toLowerCase();
        bContent = bContent.toLowerCase();
    }
    
    if (aContent === bContent) {
        return 0;
    }

    if (aContent > bContent) {
        return 1;
    } else {
        return -1;
    }

   })

   renderTableUsers(users);

}


// Iniciar
renderTableUsers(User.getUsers());