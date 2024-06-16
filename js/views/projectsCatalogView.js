import { init as initProjects, filtrarProjetosPorEstado } from "../models/ProjectModel.js";
import { init as initEvents, filtrarEventoPorEstado } from "../models/EventModel.js";

function renderAll() {
    const myCatalog = document.querySelector("#myCatalogRow");

    let projectsPublicados = filtrarProjetosPorEstado("Publicado");
    let projectsDestacados = filtrarProjetosPorEstado("Destacado");
    let eventsPublicados = filtrarEventoPorEstado("Publicado");
    let eventsDestacados = filtrarEventoPorEstado("Destacado");

    // Juntar array dos projetos/eventos publicados com a dos destacados
    let projects = projectsPublicados.concat(projectsDestacados, eventsDestacados, eventsPublicados);

    myCatalog.innerHTML = "";

    if (projects.length === 0) {
        myCatalog.innerHTML = "<p>Não foram encontrados projetos/eventos...</p>";
        return;
    }

    projects.forEach(project => {
        renderProject(project);
    });

    // Adicionar listener para ordenar eventos por data
    const btnSortAsc = document.querySelector("#btnSortAsc");
    if (btnSortAsc) {
        btnSortAsc.addEventListener("click", sortEventsByDate);
    }
}

function renderProject(projectData) {
    // Remover caracteres especiais e espaço para não causar problemas
    const projectId = projectData.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');

    // Projetos
    if (projectData.author) {
        document.querySelector("#myCatalogRow").innerHTML += `
            <div class="col-md-4 projetos" id="${projectId}" style="height: 750px; padding-bottom: 32px;">
                <div class="card custom-border" style="height: 750px;box-shadow: var(--custom-shadow);">
                    <img src="${projectData.photo ? projectData.photo : '../../media/img/ImagePlaceholder.png'}" loading="lazy" class="card-img-top" style="height: 500px;border-radius:0;border-bottom: 1px solid var(--color-yellow);">
                    <div class="card-body">
                        <h5 class="card-title">${projectData.name} - ${projectData.author}</h5>
                        <p class="event-description">${projectData.msgProjects}
                        ${projectData.link ? `<a href="${projectData.link}" class="link" target="_blank">+</a></p>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    // Eventos
    if (projectData.date) {
        document.querySelector("#myCatalogRow").innerHTML += `
            <div class="col-md-4 eventos" id="${projectId}" style="height: 750px; padding-bottom: 32px;">
                <div class="card custom-border" style="height: 750px;">
                    <img src="${projectData.photo ? projectData.photo : '../../media/img/ImagePlaceholder.png'}" loading="lazy" class="card-img-top" style="height: 500px;border-radius:0;border-bottom: 1px solid var(--color-yellow);">
                    <div class="card-body">
                        <h5 class="card-title">${projectData.name} - ${projectData.date}</h5>
                        <p class="event-description">${projectData.msgEvent}
                        ${projectData.link ? `<a href="${projectData.link}" class="link" target="_blank">+</a></p>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
}

function sortEventsByDate() {
    const myCatalogRow = document.querySelector("#myCatalogRow");
    const allEventCards = myCatalogRow.querySelectorAll(".eventos");

    const sortedEventCards = Array.from(allEventCards).sort((a, b) => {
        const dateA = new Date(a.querySelector(".card-title").textContent.split(" - ")[1]);
        const dateB = new Date(b.querySelector(".card-title").textContent.split(" - ")[1]);
        return dateA - dateB;
    });

    myCatalogRow.innerHTML = "";

    sortedEventCards.forEach(card => {
        myCatalogRow.appendChild(card);
    });
}

function filtrarPorNome() {
    // Procurar projeto pelo nome automatico
    const filterInputProjects = document.querySelector("#txtProject");

    filterInputProjects.addEventListener("input", () => {
        let projectsPublicados = filtrarProjetosPorEstado("Publicado");
        let projectsDestacados = filtrarProjetosPorEstado("Destacado");
        let eventsPublicados = filtrarEventoPorEstado("Publicado");
        let eventsDestacados = filtrarEventoPorEstado("Destacado");

        let projects = projectsPublicados.concat(projectsDestacados, eventsPublicados, eventsDestacados);

        let filterValue = filterInputProjects.value.toLowerCase();

        projects.forEach(project => {
            // Remover caracteres especiais e espaço para não causar problemas
            const projectId = project.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');

            const card = document.querySelector(`#${projectId}`);

            if (card) {
                if (project.name.toLowerCase().includes(filterValue)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            }
        });
    });
}

function filtrarPorTipo() {
    const filterType = document.querySelector("#sltType");

    filterType.addEventListener("change", () => {
        let projectsPublicados = filtrarProjetosPorEstado("Publicado");
        let projectsDestacados = filtrarProjetosPorEstado("Destacado");
        let eventsPublicados = filtrarEventoPorEstado("Publicado");
        let eventsDestacados = filtrarEventoPorEstado("Destacado");

        let projects = projectsPublicados.concat(projectsDestacados, eventsPublicados, eventsDestacados);

        let filterValue = filterType.value.toLowerCase();

        if (filterValue === "todos") {
            projects.forEach(project => {
                // Remover caracteres especiais e espaço para não causar problemas
                const projectId = project.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');

                const card = document.querySelector(`#${projectId}`);

                if (card) {
                    card.style.display = "block";
                }
            });
        } else {
            projects.forEach(project => {
                // Remover caracteres especiais e espaço para não causar problemas
                const projectId = project.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');

                const card = document.querySelector(`#${projectId}`);

                const cardClass = card.className;

                if (card) {
                    if (cardClass.includes(filterValue)) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                }
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initProjects();
    initEvents();
    renderAll();
    filtrarPorNome();
    filtrarPorTipo();
});

// Dar refresh da página caso a local storage dos projetos ou eventos mude
window.addEventListener("storage", event => {
    if (event.key === "projects" || event.key === "events") {
        location.reload();
    }
});

// Lazy load
document.addEventListener('DOMContentLoaded', function () {
    function onIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                var card = entry.target;
                card.style.opacity = 1;
                // Prevenir iniciar duas vezes
                observer.unobserve(entry.target);
            }
        });
    }

    var observer = new IntersectionObserver(onIntersection, { threshold: 0.3 });

    document.querySelectorAll(".card").forEach(card => {
        observer.observe(card);
    });
});
