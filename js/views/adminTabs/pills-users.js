import * as User from "../../models/UserModel.js"

// Variaveis que gerem páginas das tabelas
const tableRows = 5;
let currentPage = 1;
let totalPages = 1;

function renderTableUsers(users = [], page = 1) {
    
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

    // Descobrir numero de paginas necessarias
    totalPages = Math.ceil(users.length / tableRows);
    
    const firstIndex = (page - 1) * tableRows;

    const lastIndex = firstIndex + tableRows;

    const toRender = users.slice(firstIndex, lastIndex);

    
    toRender.forEach(user => {
        
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
                <td style="text-align: center;">
                    <button class="btn bloquear" id="${user.username}" type="button" style="border-radius: 0;">
                        ${user.blocked ? "Desbloquear" : "Bloquear"}
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
                renderTableUsers(User.getUsers(),currentPage);
                customToast("Utilizador removido com sucesso!")   
            }
        })
    }

     // Clicar no botão bloquear USER

     const btnsBlock = document.getElementsByClassName("bloquear");

     for (const button of btnsBlock) {
         button.addEventListener("click", () => {
             
            User.blockUser(button.id);
            renderTableUsers(User.getUsers(),currentPage);
            
            const user = User.findUser(button.id)

            if (!user.blocked) {
                customToast("Utilizador desbloqueado com sucesso!");
            } else {
                customToast("Utilizador bloqueado com sucesso!");
            }

         })
     }

    tableHeaders();
    updatePage();

}

// Controls das páginas
function updatePage() {
    const prevBtn = document.querySelector("#prevPage");
    const nextBtn = document.querySelector("#nextPage");
    const pageNumber = document.querySelector("#pageNumber");

    if (currentPage === 1 && currentPage !== totalPages) {
        prevBtn.disabled = true;
        nextBtn.disabled = false;
        
        nextBtn.style.backgroundColor = "var(--color-yellow)";
        prevBtn.style.backgroundColor = "var(--color-black)";
    }
    if (currentPage === totalPages && currentPage !== 1) {
        prevBtn.disabled = false;
        nextBtn.disabled = true;

        nextBtn.style.backgroundColor = "var(--color-black)";
        prevBtn.style.backgroundColor = "var(--color-yellow)";
    }
    if (currentPage === 1 && totalPages === 1) {
        prevBtn.disabled = true;
        nextBtn.disabled = true;

        prevBtn.style.backgroundColor = "var(--color-black)";
        nextBtn.style.backgroundColor = "var(--color-black)";
    }

    pageNumber.textContent = `${currentPage} de ${totalPages}`;

}

document.querySelector("#prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage = currentPage - 1;

        renderTableUsers(User.getUsers(filterInputUsers.value), currentPage);
    }
})

document.querySelector("#nextPage").addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage = currentPage + 1;

        renderTableUsers(User.getUsers(filterInputUsers.value), currentPage);
    }
})



// Procurar user pelo nome automatico
const filterInputUsers = document.querySelector("#procuraUser");

filterInputUsers.addEventListener("input", () => {
    currentPage = 1;
    renderTableUsers(User.getUsers(filterInputUsers.value),currentPage);
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
    currentPage = 1;
    let users = User.getUsers();

    if ( original === null) {
        // Criar uma cópia dos users antes de organizar
        original = users.slice();
    }

    // Voltar à ordem original
    if (!isSorted) {
        renderTableUsers(original, currentPage);
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

   renderTableUsers(users, currentPage);

}

function customToast(message) {
    
    document.querySelector("#adminToast").textContent = message;

    var toast = new bootstrap.Toast(document.querySelector("#alertToast"));

    toast.show();
}


// Iniciar
renderTableUsers(User.getUsers(), currentPage);