import * as Project from "../../models/ProjectModel.js"

// Variavel criada para distinguir entre editar e adicionar projeto
let currentEditingProject = null;
// Variaveis que gerem páginas das tabelas
const tableRows = 5;
let currentPage = 1;
let totalPages = 1;

// Form submit para editar e adicionar projetos
function submitForm() {
    const form = document.querySelector("#formProjetos");
    const fileInput = document.querySelector("#fileInputProjects");
    const previewImg = document.querySelector("#imgPreview");
    
    form.addEventListener("submit",(event) => {
        event.preventDefault();

        const imgData = fileInput.files[0];
        
        // Guardar valores dos inputs
        const projectData = {
            name: document.querySelector("#formNomeP").value,
            link: document.querySelector("#formLinkP").value,
            author: document.querySelector("#formAuthorP").value,
            msgProjects: document.querySelector("#formMsgP").value,
            photo: previewImg.src
        }
        
        if (imgData) {
            // Criar instancia do file reader que converte a imagem para string
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                
                resizeImage(reader.result, (resizedImg) => {
                    projectData.photo = resizedImg;

                    submitProject(projectData);
                }) 
                
            })

            reader.readAsDataURL(imgData);

        } else {
            // Se não tiver imagem
            submitProject(projectData);
        }
        
    });

    fileInput.addEventListener("change", (event) => {
        const imgData = event.target.files[0];

        if (imgData) {
            // Adicionar pre-visualização da imagem quando há uma imagem selecionada
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                
                resizeImage(reader.result, (resizedImg) => {
                    previewImg.src = resizedImg;
                    previewImg.style.display = "block";
                }) 
               
            })

            reader.readAsDataURL(imgData);

        } else {
            
            previewImg.src = "";
            previewImg.style.display = "none";
        }

    })

    
}

function submitProject(projectData) {
    try {
        
        if (currentEditingProject) {
            // Editar projeto 

            Project.editProject(currentEditingProject, projectData);
            customToast("Projeto editado com sucesso!");

        } else {
            // Adicionar projeto

            Project.addProject(projectData.name, projectData.photo, projectData.link, projectData.author, projectData.msgProjects);
            customToast("Projeto adicionado com sucesso!")
        }

        // limpar variavel que "avisa" se é para editar ou adicionar projeto
        currentEditingProject = null;
        // limpar inputs
        document.querySelector("#formProjetos").reset();
        // atualizar tabela
        renderTableProjects(Project.getProjects(), currentPage);

    } catch (error) {
        customToast(error.message);
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

        document.querySelector("#imgPreview").src = project.photo ? project.photo : "../../../media/img/ImagePlaceholder.png";
        document.querySelector("#imgPreview").style.display = "block";

        document.querySelector("#cancelEditProject").style.display = "block";

    }
   
}

function initCancelButton() {
    
    const form = document.querySelector("#formProjetos");
    const cancelEditP = document.querySelector("#cancelEditProject");
    const img = document.querySelector("#imgPreview");
    
    
    form.addEventListener("input", () => {
        
        const inputs = form.querySelectorAll("input[type='text']");
        let verificarValores = false;

        inputs.forEach(input => {
            if(input.value.trim() !== "") {
                verificarValores = true;
            }
        })
        
        
        // adicionar/remover botão para dar reset ao form. Se os inputs tiverem algum valor, adiciona o botão, se estiverem vazios, remove.
        cancelEditP.style.display = verificarValores ? "block" : "none";

    })

    // remover botão depois de dar reset
    cancelEditP.addEventListener("click", () => {
        cancelEditP.style.display = "none";
        // remover image preview
        img.style.display = "none";
        currentEditingProject = null;
    })

    form.addEventListener("submit", () => {
        cancelEditP.style.display = "none";
        img.style.display = "none";
    })

}

// Form submit para editar e adicionar projetos

function renderTableProjects(projects = [], page = 1) {
    
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

    // Descobrir numero de paginas necessarias
    totalPages = Math.ceil(projects.length / tableRows);
    
    const firstIndex = (page - 1) * tableRows;

    const lastIndex = firstIndex + tableRows;

    const toRender = projects.slice(firstIndex, lastIndex);
    
    toRender.forEach(project => {
     
        let projectId = project.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
        
        tabelaProjects.innerHTML += 
        `
            <tr id="${projectId}">
                <td>${project.author}</td>
                <td>${project.name}</td>
                <td>${project.msgProjects}</td>
                <td style="text-align: center;">${project.link ? 'Sim' : 'Não'}</td>
                <td style="text-align: center;">${project.photo ? 'Sim' : 'Não'}</td>
                <td style="text-align: center;" class="${project.state}">${project.state}</td>
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

    // Event listeners
    tableEvents();
    updatePage();

}

// Controls das páginas
function updatePage() {

    const prevBtn = document.querySelector("#prevPageProjects");
    const nextBtn = document.querySelector("#nextPageProjects");
    const pageNumber = document.querySelector("#pageNumberProjects");

    pageNumber.textContent = `${currentPage} de ${totalPages}`;

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

}

// Procurar projeto pelo nome automatico
const filterInputProjects = document.querySelector("#procuraProjetos");
function filterByName() {

    filterInputProjects.addEventListener("input", () => {
        renderTableProjects(Project.getProjects(filterInputProjects.value), currentPage);
    })

}

document.querySelector("#prevPageProjects").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage = currentPage - 1;

        renderTableProjects(Project.getProjects(filterInputProjects.value), currentPage);
    }
})

document.querySelector("#nextPageProjects").addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage = currentPage + 1;

        renderTableProjects(Project.getProjects(filterInputProjects.value), currentPage);
    }
})

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

    let projects = Project.getProjects();
    
    // Encontrar index no projects array
    let ProjectIndex = projects.findIndex(project => project.name === projectName);

    if (ProjectIndex !== -1) {
        
        // Mudar estado do projeto 
        projects[ProjectIndex].state = newState;
        
        // Atualizar local storage
        localStorage.setItem("projects", JSON.stringify(projects));
        
        // Atualizar tabela
        renderTableProjects(projects, currentPage);

    }
    
}

function customToast(message) {
    
    document.querySelector("#adminToast").textContent = message;

    var toast = new bootstrap.Toast(document.querySelector("#alertToast"));

    toast.show();
}

function resizeImage(imgURL, callback) {
    const img = new Image();

    // Alterar tamanho apenas quando imagem acabar de carregar
    img.addEventListener("load", () => {
        
        const maxWidth = 800;       // Ajustar estes valores para aumentar/diminuir tamanho das imagens
        const maxHeight = 600;

        let width = img.width;
        let height = img.height;

        //  Dar resize da imagem caso seja necessario, sem perder aspect ratio
        if (width > maxWidth || height > maxHeight) {
    
            const aspectRatio = width/height;

            if (width > maxWidth) {
                
                width = maxWidth;

                height = width / aspectRatio;

            } else {
                
                height = maxHeight;

                width = height * aspectRatio;
            }

        }

        const canvas = document.createElement("canvas");

        const content = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        content.drawImage(img, 0, 0, width, height);

        const newUrl = canvas.toDataURL("image/jpeg");

        callback(newUrl);

    })

    // Adicionar src ao novo elemento img criado
    img.src = imgURL;

}

function tableEvents() {
        
    // Clicar no botão remover PROJETO
    const btnsRemoveP = document.getElementsByClassName("removeP");

    for (const button of btnsRemoveP) {
        button.addEventListener("click", () => {
            if(confirm("Queres mesmo remover o projeto?")) {
                
                Project.removeProjects(button.id);

                renderTableProjects(Project.getProjects(), currentPage);
                
                customToast("Projeto removido com sucesso!");

            }
        })
    }

    // Clicar no botão editar 
    const btnsEditarP = document.getElementsByClassName("editarP");

    for (const button of btnsEditarP) {
        button.addEventListener("click", () => {
           
            editProject(button.id);
            
        })
    }

    // Clicar no botão publicar
    const btnsPublicarP = document.getElementsByClassName("publicarP");

    for (const button of btnsPublicarP) {
        button.addEventListener("click", () => {
            
            postProject(button.id);
            customToast("Projeto publicado com sucesso!");
            
        })
    }

    // Clicar no botão ocultar
    const btnsOcultarP = document.getElementsByClassName("ocultarP");

    for (const button of btnsOcultarP) {
        button.addEventListener("click", () => {
            
            hideProject(button.id);  
            customToast("Projeto ocultado com sucesso!"); 
            
        })
    }

    // Clicar no botão destacar
    const btnsDestacarP = document.getElementsByClassName("destacarP");

    for (const button of btnsDestacarP) {
         button.addEventListener("click", () => {
             
            highlightProject(button.id);
            customToast("Projeto destacado com sucesso!");
             
         })
    }

    tableHeaders();

}

let headersEvents = false;
function tableHeaders() {
    
    // Evitar colocar event listeners 2x
    if (headersEvents) {
        return;
    } 

    headersEvents = true;
    
    // Clicar nos headers da tabela para organizar linhas
    let isSorted = false;
    const tHeader = document.querySelector("#tableHeaderProjects");
    const tHeaders = tHeader.querySelectorAll("th");
    
    tHeaders.forEach(header => {
        const headerIndex = parseInt(header.getAttribute("id"));
        
        // Excluir coluna com botão para gerir projetos
        if (headerIndex != 6) {
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
    let projects = Project.getProjects();

    if ( original === null) {
        // Criar uma cópia dos projetos antes de organizar
        original = projects.slice();
    }

    // Voltar à ordem original
    if (!isSorted) {
        renderTableProjects(original, currentPage);
        return;
    }

   projects.sort((a,b) => {
    let aContent = null;
    let bContent = null;

    switch (colIndex) {
        case 0:
            // Coluna autor
            aContent = a.author;
            bContent = b.author;

            break;
        case 1:
            // Coluna nome
            aContent = a.name;
            bContent = b.name;
            
            break;
        case 2:
            // Coluna mensagem
            aContent = a.msgProjects;
            bContent = b.msgProjects;
            
            break;
        case 3:
            // Coluna link
            aContent = a.link ? "Sim" : "Não";
            bContent = b.link ? "Sim" : "Não";
            
            break;
        case 4:
            // Coluna imagem
            aContent = a.photo ? "Sim" : "Não";
            bContent = b.photo ? "Sim" : "Não";
            
            break;
        case 5:
            // Coluna estado
            aContent = a.state;
            bContent = b.state;
            
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

   renderTableProjects(projects, currentPage);

}



// INICIAR
Project.init()

renderTableProjects(Project.getProjects(), currentPage);

submitForm();

filterByName();

initCancelButton();

