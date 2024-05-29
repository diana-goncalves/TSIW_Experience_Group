import * as Project from "../../models/ProjectModel.js"

// Para o futuro: substituir locaction.reload();

// Variavel criada para distinguir entre editar e adicionar projeto
let currentEditingProject = null;

// Form submit para editar e adicionar projetos
function submitForm() {
    document.querySelector("#formProjetos").addEventListener("submit",(event) => {
        event.preventDefault();

        const imgData = document.querySelector("#fileInputProjects").files[0];
        
        // Guardar valores dos inputs
        const projectData = {
            name: document.querySelector("#formNomeP").value,
            link: document.querySelector("#formLinkP").value,
            author: document.querySelector("#formAuthorP").value,
            msgProjects: document.querySelector("#formMsgP").value,
        }
        
        if (imgData) {
            // Criar instancia do file reader que converte a imagem para string
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                // Adicionar imagem ao projectData
                projectData.photo = reader.result;

                submitProject(projectData);
                
            })

            reader.readAsDataURL(imgData);

        } else {
            // Se não tiver imagem
            projectData.photo = null;

            submitProject(projectData);
        }
        
    });
    
}

function submitProject(projectData) {
    try {
        
        if (currentEditingProject) {
            // Editar projeto 

            Project.editProject(currentEditingProject, projectData);
            alert("Projeto editado com sucesso!");

        } else {
            // Adicionar projeto

            Project.addProject(projectData.name, projectData.photo, projectData.link, projectData.author, projectData.msgProjects);
            alert("Projeto adicionado com sucesso!")
        }

        // limpar variavel que "avisa" se é para editar ou adicionar projeto
        currentEditingProject = null;

    } catch (error) {
        alert(error.message);
    } finally {
        location.reload();
    }
}

// Esta função está encarregue de ir buscar os dados do projeto e colocar nos inputs e adicionar o botão para cancelar edição. 

function editProject(projectName) {
    
    const project = Project.getProjectByName(projectName);

    if (project) {
        currentEditingProject = projectName;
        
        document.querySelector("#formNomeP").value = project.name;
        document.querySelector("#formLinkP").value = project.link;
        document.querySelector("#formAuthorP").value = project.author;
        document.querySelector("#formMsgP").value = project.msgProjects;
        
    }
   
    // adicionar botão para cancelar edição

    const cancelEditP = document.querySelector("#cancelEditProject");
    
    // adicionar botão para dar reset ao form
    cancelEditP.style.display = "block";

    // remover botão depois de dar reset
    cancelEditP.addEventListener("click", () => {
        cancelEditP.style.display = "none";
        currentEditingProject = null;
    })

}

// Form submit para editar e adicionar projetos

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
        
        // Sempre que se edita/adiciona um projeto ou caso não seja especificado, o estado é definido como Oculto.
        let classState = null;

        switch (project.state) {
            case "Publicado":
                classState = "Publicado";
                break;
        
            case "Destacado":
                classState = "Destacado";
                break;
            
            default:
                classState = "Oculto"
                break;
        }
        
        let projectId = project.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
        
        
        tabelaProjects.innerHTML += 
        `
            <tr id="${projectId}">
                <td>${project.author}</td>
                <td>${project.name}</td>
                <td>${project.msgProjects}</td>
                <td style="text-align: center;">${project.link ? 'Sim' : 'Não'}</td>
                <td style="text-align: center;">${project.photo ? 'Sim' : 'Não'}</td>
                <td style="text-align: center;" class="${classState}">${project.state}</td>
                <td style="text-align: center;">
                    
                    <div class="dropdown">
                        
                        <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false"  style="color:var(--color-yellow);border:0;">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>

                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item removeP" id="${project.name}"">Remover</a></li>
                            <li><a class="dropdown-item editarP" id="${project.name}">Editar</a></li>
                            <li><a class="dropdown-item publicarP" id="${project.name}">Publicar</a></li>
                            <li><a class="dropdown-item destacarP" id="${project.name}">Destacar</a></li> 
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
                const projectId = button.id.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
                
                Project.removeProjects(button.id);
                
                const projectRow = document.querySelector(`#${projectId}`);

                tabelaProjects.removeChild(projectRow)

                customToast("Projeto removido com sucesso!")

            }
        })
    }

    // Clicar no botão editar 

    const btnsEditarP = document.getElementsByClassName("editarP");

    for (const button of btnsEditarP) {
        button.addEventListener("click", () => {
            if(confirm("Queres mesmo editar o projeto?")) {
                editProject(button.id);
            }
        })
    }

    // Clicar no botão publicar - NAO IMPLEMENTADO

    const btnsPublicarP = document.getElementsByClassName("publicarP");

    for (const button of btnsPublicarP) {
        button.addEventListener("click", () => {
            if(confirm("Queres mesmo publicar o projeto?")) {
                postProject(button.id);
                customToast("Projeto publicado com sucesso!");
            }
        })
    }

    // Clicar no botão ocultar - NAO IMPLEMENTADO

    const btnsOcultarP = document.getElementsByClassName("ocultarP");

    for (const button of btnsOcultarP) {
        button.addEventListener("click", () => {
            if(confirm("Queres mesmo ocultar o projeto?")) {
                hideProject(button.id);  
                customToast("Projeto ocultado com sucesso!"); 
            }
        })
    }

     // Clicar no botão destacar - NAO IMPLEMENTADO

     const btnsDestacarP = document.getElementsByClassName("destacarP");

     for (const button of btnsDestacarP) {
         button.addEventListener("click", () => {
             if(confirm("Queres mesmo destacar o projeto?")) {
                highlightProject(button.id);
                customToast("Projeto destacado com sucesso!");
             }
         })
     }

}

function filterSortEventListeners() {
    // Procurar projeto pelo nome automatico
    const filterInputProjects = document.querySelector("#procuraProjetos");

    filterInputProjects.addEventListener("input", () => {
        renderTableProjects(Project.getProjects(filterInputProjects.value));
    })

    // Clicar no botão organizar
    let isSorted = false;
    const orderButtonProjects = document.querySelector("#btnOrderProjetos");

    orderButtonProjects.addEventListener("click", () => {
        
        if(isSorted) {
            // Caso já tenham clicado para organizar, tirar o sort
            renderTableProjects(Project.getProjects(filterInputProjects.value));
        } else {
            // Organizar a lista de projetos filtrados, se não houver filtros organiza APENAS a tabela
            renderTableProjects(Project.sortProjects(Project.getProjects(filterInputProjects.value)));
        }
        
        isSorted = !isSorted;

    })
}

function postProject(projectName) {

    editState(projectName,"Publicado");

}

function hideProject(projectName) {
    
    editState(projectName,"Oculto");

}

function highlightProject(projectName) {

    editState(projectName,"Destacado");

}

function editState(projectName, newState) {
    // Alterar estado na local storage e atualizar tabela
    let projects = JSON.parse(localStorage.getItem("projects"));
    const projectId = projectName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
    
    let ProjectIndex = projects.findIndex(project => project.name === projectName);

    if (ProjectIndex !== -1) {
        
        // Mudar estado do projeto 
        projects[ProjectIndex].state = newState;
        
        // Atualizar local storage
        localStorage.setItem("projects", JSON.stringify(projects));
        
        // Atualizar estado na tabela
        let projectRow = document.querySelector(`#${projectId}`);

        const stateCol = projectRow.cells[5];

        stateCol.textContent = newState;

        stateCol.className = newState;

    }
    
}

function customToast(message) {
    
    document.querySelector("#adminToast").textContent = message;

    var toast = new bootstrap.Toast(document.querySelector("#alertToast"));

    toast.show();
}

// INICIAR
Project.init()

renderTableProjects(Project.getProjects());

submitForm();

filterSortEventListeners();