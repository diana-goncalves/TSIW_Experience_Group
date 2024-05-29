import { init, filtrarProjetosPorEstado,  } from "../models/ProjectModel.js";

// Carregar projetos
init()

function renderProjects() {
    const myCatalog = document.querySelector("#myCatalogRow");
    
    let projectsPublicados = filtrarProjetosPorEstado("Publicado");
    let projectsDestacados = filtrarProjetosPorEstado("Destacado");
    
    // Juntar array dos projetos publicados com a dos destacados
    let projects = projectsPublicados.concat(projectsDestacados);
    
    myCatalog.innerHTML = "";

    if (projects.length === 0) {
        myCatalog.innerHTML = "<p>Não foram encontrados projetos...</p>";
        return;
    }
  
    projects.forEach(project => {
        renderProject(project);
    })

}

function renderProject(projectData) {
    
    // Remover caracteres especiais e espaço para não causar problemas
    const projectId = projectData.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
    
    document.querySelector("#myCatalogRow").innerHTML += 
    `
        <div class="col-md-4" id="${projectId}" style="height: 750px; padding-bottom: 32px;">
            
            <div class="card custom-border" style="height: 750px">
                
                <img src="${projectData.photo ? projectData.photo : '../../media/img/ImagePlaceholder.png'}" loading="lazy" class="card-img-top" style="height: 500px;border-radius:0;border-bottom: 1px solid var(--color-yellow);">
                
                <div class="card-body">
                    <h5 class="card-title">${projectData.name} - ${projectData.author}</h5>
                    <p class="event-description">${projectData.msgProjects}
                    ${projectData.link ? `<a href="${projectData.link}" class="link" target="_blank">+</a></p>` : ''}
                </div>

            </div>

        </div>
    `

}

// Iniciar

document.addEventListener("DOMContentLoaded", () => {
    
    renderProjects();

    // Procurar projeto pelo nome automatico
    const filterInputProjects = document.querySelector("#txtProject");

    filterInputProjects.addEventListener("input", () => {
    
        let projects = filtrarProjetosPorEstado("Publicado");

        let filterValue = filterInputProjects.value.toLowerCase();

        projects.forEach(project => {
            
            // Remover caracteres especiais e espaço para não causar problemas
            const projectId = project.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
            
            const card = document.querySelector(`#${projectId}`)

            if (card) {
                
                if (project.name.toLowerCase().includes(filterValue)) {
                    
                    card.style.display = "block";

                } else {
                    card.style.display = "none";
                }

            }

        });

    })

})

// Dar refresh da página caso a local storage dos projetos mude

window.addEventListener("storage", event => {
    if (event.key === "projects") {
        location.reload();
    }
})
