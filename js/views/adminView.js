import * as User from "../models/UserModel.js"
import * as Project from "../models/ProjectModel.js"

User.init()
Project.init()

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
        renderTableProjects(Project.getProjects());
       
    }

    // Admin dashboard

} else {
    alert("Tens que fazer login primeiro!")
    
    // setTimeout(() => {
    //     location.href = "../../html/login.html";
    // }, 500);
    
    location.href = "../../html/login.html";

}

// GERIR UTILIZADORES ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
                renderTableUsers(User.getUsers());
            }
        })
    }

    // Clicar no botão bloquear USER - PARA JÁ FAZ O MESMO QUE O BOTÃO REMOVER

    const btnsBloquear = document.getElementsByClassName("bloquear");

    for (const button of btnsBloquear) {
        button.addEventListener("click", () => {
            if(confirm("Queres mesmo bloquear o utilizador?")) {
                User.removeUser(button.id);
                renderTableUsers(User.getUsers());
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


// GERIR UTILIZADORES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GERIR PROJETOS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// adicionar novo Projeto

function newProject() {
    document.querySelector("#formProjetos").addEventListener("submit",(event) => {
        event.preventDefault();
        try {
            Project.addProject(
                document.querySelector("#formNomeP").value,
                // document.querySelector("fileInputProjects").value//,
                "teste",
                document.querySelector("#formLinkP").value,
                document.querySelector("#formAuthorP").value,
                document.querySelector("#formMsgP").value
            );
            alert("Projeto adicionado com sucesso!");
            renderTableProjects(Project.getProjects());
        } catch (error) {
            alert(error.message);
        }
    });
}

// adicionar novo Projeto

function renderTableProjects(projects = []) {
    
    const tabelaProjects = document.querySelector("#table-projetos");
    
    // Limpar tabela primeiro
    tabelaProjects.innerHTML = "";
    
    // Caso não encontre users ( filtro não encontra nenhum nome igual )
    if (projects.length === 0) {
        tabelaProjects.innerHTML = 
        `
            <tr>
                <td colspan="7" style="text-align:center;">Não foram encontrados projetos!</td>
            </tr>
        `
        return;
    }
    
    projects.forEach(project => {
        tabelaProjects.innerHTML += 
        `
            <tr>
                <td>${project.author}</td>
                <td>${project.name}</td>
                <td>${project.msgProjects}</td>
                <td>${project.link}</td>
                <td>${project.photo}</td>
                <td>NÃO IMPLEMENTADO</td>
                <td style="text-align: center;">
                    
                    <div class="dropdown">
                        
                        <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="color:var(--color-yellow);border:0;">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>

                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item removeP" id="${project.name}"">Remover</a></li>
                            <li><a class="dropdown-item editarP" id="${project.name}">Editar</a></li>
                            <li><a class="dropdown-item publicarP" id="${project.name}">Publicar</a></li>
                            <li><a class="dropdown-item ocultarP" id="${project.name}">Ocultar</a></li>    
                        </ul>

                    </div>
                   
                </td>
            </tr>
        `
    });

    // Clicar no botão remover PROJETO

    const btnsRemoveP = document.getElementsByClassName("removeP");

    for (const button of btnsRemoveP) {
        button.addEventListener("click", () => {
            if(confirm("Queres mesmo remover o projeto?")) {
                Project.removeProjects(button.id);
                location.reload();
            }
        })
    }

    // Clicar no botão editar - NAO IMPLEMENTADO

    const btnsEditarP = document.getElementsByClassName("editarP");

    for (const button of btnsEditarP) {
        button.addEventListener("click", () => {
            if(confirm("Queres mesmo editar o projeto?")) {
                Project.editProject(button.id);
                renderTableProjects(Project.getProjects());
            }
        })
    }

    // Clicar no botão publicar - NAO IMPLEMENTADO

    const btnsPublicarP = document.getElementsByClassName("publicarP");

    for (const button of btnsPublicarP) {
        button.addEventListener("click", () => {
            if(confirm("Queres mesmo publicar o projeto?")) {
                Project.postProject(button.id);
                renderTableProjects(Project.getProjects());
            }
        })
    }

    // Clicar no botão ocultar - NAO IMPLEMENTADO

    const btnsOcultarP = document.getElementsByClassName("ocultarP");

    for (const button of btnsOcultarP) {
        button.addEventListener("click", () => {
            if(confirm("Queres mesmo publicar o projeto?")) {
                Project.hideProject(button.id);
                renderTableProjects(Project.getProjects());
            }
        })
    }


    newProject()

}











// GERIR PROJETOS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
