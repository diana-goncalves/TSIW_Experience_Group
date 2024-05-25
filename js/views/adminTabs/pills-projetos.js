import * as Project from "../../models/ProjectModel.js"

Project.init()

// É PRECISO ADICIONAR BOTÃO PARA CANCELAR EDIÇÃO

// Form submit para editar e adicionar projetos

// Variavel criada para distinguir entre editar e adicionar projeto
let currentEditingProject = null;

function submitForm() {
    document.querySelector("#formProjetos").addEventListener("submit",(event) => {
        event.preventDefault();

        const imgPath = document.querySelector("#fileInputProjects").files[0];
        
        // Guardar valores dos inputs
        const projectData = {
            name: document.querySelector("#formNomeP").value,
            link: document.querySelector("#formLinkP").value,
            author: document.querySelector("#formAuthorP").value,
            msgProjects: document.querySelector("#formMsgP").value,
        }
        
        if (imgPath) {
            // Criar instancia do file reader que converte a imagem para string
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                // Adicionar imagem ao projectData
                projectData.photo = reader.result;

                submitProject(projectData);
                
            })

            reader.readAsDataURL(imgPath);

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
            alert("Projeto adicionado com sucesso!");
            location.reload();
        }

        // Atualizar tabela
        renderTableProjects(Project.getProjects());

        // limpar inputs
        document.querySelector("#formProjetos").reset();

        // limpar variavel que "avisa" se é para editar ou adicionar projeto
        currentEditingProject = null;

    } catch (error) {
        alert(error.message);
    }
}

// FALTA EDITAR IMAGEM

function editProject(projectName) {
    
    const project = Project.getProjectByName(projectName);

    if (project) {
        currentEditingProject = projectName;
        
        document.querySelector("#formNomeP").value = project.name;
        document.querySelector("#formLinkP").value = project.link;
        document.querySelector("#formAuthorP").value = project.author;
        document.querySelector("#formMsgP").value = project.msgProjects;

        // adicionar botão para cancelar edição

        
        const cancelEditP = document.querySelector("#cancelEditProject");
        
        // Prevenir colocar 2 botões
        if (!cancelEditP) {
            
            const cancelButtonP = document.createElement("button");
            
            cancelButtonP.type = "button";
            cancelButtonP.className = "btn btn-primary button_color btnGuardar";
            cancelButtonP.id = "cancelEditProject";
            cancelButtonP.textContent = "Cancelar";

            document.querySelector("#addProjectsButtonsContainer").appendChild(cancelButtonP);

            cancelButtonP.addEventListener("click",cancelEdit);

        }
        
    }
   
}

// Dar reset ao form

function resetForm() {
    document.querySelector("#formProjetos").reset();
}

function cancelEdit() {
    
    resetForm();

    document.querySelector("#cancelEditProject").remove();

    currentEditingProject = null;

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
        tabelaProjects.innerHTML += 
        `
            <tr>
                <td>${project.author}</td>
                <td>${project.name}</td>
                <td>${project.msgProjects}</td>
                <td style="text-align: center;">${project.link ? 'Sim' : 'Não'}</td>
                <td style="text-align: center;">${project.photo ? 'Sim' : 'Não'}</td>
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
                Project.removeProjects(button.id);
                location.reload();
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

     // Clicar no botão destacar - NAO IMPLEMENTADO

     const btnsDestacarP = document.getElementsByClassName("destacarP");

     for (const button of btnsDestacarP) {
         button.addEventListener("click", () => {
             if(confirm("Queres mesmo destacar o projeto?")) {
                 Project.highlightProject(button.id);
                 renderTableProjects(Project.getProjects());
             }
         })
     }

    submitForm();

}

// Iniciar
renderTableProjects(Project.getProjects());