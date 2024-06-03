import { init as initProjetos, filtrarProjetosPorEstado } from "../models/ProjectModel.js";
import { init as initEventos, filtrarEventoPorEstado} from "../models/EventModel.js";
import { init as initAlumni, filtrarTestemunhoPorEstado, getTestemunhoByName } from "../models/AlumniModel.js";

// Scrollspy bootstrap
document.addEventListener('DOMContentLoaded', function () {
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbarNav',
        offset: 100  // Ajustar este valor conforme a altura da navbar
    });

})

// Gauge
document.addEventListener('DOMContentLoaded', function () {
    // Opções padrão para todos os gauges
    var opts = {
        angle: 0.50,
        lineWidth: 0.1,
        radiusScale: 1,
        limitMax: false,     // If false, the max value of the gauge will be updated if value surpass max
        limitMin: false,     // If true, the min value of the gauge will be fixed
        colorStart: '#FFD100',
        colorStop: '#FFEE32',
        strokeColor: '#F4F4F4',
        generateGradient: true,
        highDpiSupport: true,
        pointer: {
            length: 0,
            strokeWidth: 0,
            color: 'transparent'
        }
    };

    // Inicialização dos gauges
    var target1 = document.getElementById('gauge1'); // Identificação do canvas
    var gauge1 = new Donut(target1).setOptions(opts); // Criação do gauge
    gauge1.maxValue = 100; // Valor máximo
    gauge1.setMinValue(0);  // Valor mínimo
    gauge1.animationSpeed = 100; // Velocidade da animação
    gauge1.set(78); // Valor inicialƒ

    var target2 = document.getElementById('gauge2');
    var gauge2 = new Donut(target2).setOptions(opts);
    gauge2.maxValue = 100;
    gauge2.setMinValue(0);
    gauge2.animationSpeed = 100;
    gauge2.set(13);

    var target3 = document.getElementById('gauge3');
    var gauge3 = new Donut(target3).setOptions(opts);
    gauge3.maxValue = 100;
    gauge3.setMinValue(0);
    gauge3.animationSpeed = 100;
    gauge3.set(9);

    var target4 = document.getElementById('gauge4');
    var gauge4 = new Donut(target4).setOptions(opts);
    gauge4.maxValue = 100;
    gauge4.setMinValue();
    gauge4.animationSpeed = 100;
    gauge4.set(0);
});


// Projetos
function renderProjects() {
    const projects = filtrarProjetosPorEstado("Destacado");

    // Se não houver projetos para destacar, escolher 3 aleatorios
    if (projects.length === 0) {
        const randomProjects = randomProject(filtrarProjetosPorEstado("Publicado"), 3);

        randomProjects.forEach(project => {
            renderProject(project);
        });

    }

    // Renderizar projetos com state "Destacado"
    projects.forEach(project => {
        renderProject(project);
    })

}

function renderProject(projectData) {

    // Remover caracteres especiais e espaço para não causar problemas
    const projectId = projectData.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');

    document.querySelector("#projectsContainer").innerHTML +=
    `
        <div class="col-md-4" id="${projectId}" style="height: 750px;">

            <div class="card custom-border" style="height: 750px">

                <img src="${projectData.photo ? projectData.photo : '../../media/img/ImagePlaceholder.png'}" class="card-img-top" style="height: 500px;border-radius:0;border-bottom: 1px solid var(--color-yellow);">

                <div class="card-body">
                    <h5 class="card-title">${projectData.name} - ${projectData.author}</h5>
                    <p class="event-description">${projectData.msgProjects}
                    ${projectData.link ? '<a href="${projectData.link}" class="link">+</a></p>' : ''}
                </div>

            </div>

        </div>
    `

}

// Projetos

// Esta função devolve "numberOfProjects" de uma determinada lista ( eventos ou projetos ). randomProject(filtrarProjetosPorEstado("Publicado"), 3) devolve 3 projetos aleatorios ( neste caso, marcados com "Publicado" )
function randomProject(projectsList, numberOfProjects) {

    const randomProjects = [];

    const retirarDuplicados = [];

    while(retirarDuplicados.length < numberOfProjects && retirarDuplicados.length < projectsList.length) {

        const randomIndex = Math.floor(Math.random() * projectsList.length);

        if(!randomProjects.includes(randomIndex)) {
            // Guardar index do projeto selecionado
            randomProjects.push(randomIndex);
            // Guardar projeto
            retirarDuplicados.push(projectsList[randomIndex]);
        }
    }

    return retirarDuplicados;
}

// Eventos

function renderEvents() {
    const events = filtrarEventoPorEstado("Destacado");
    
    // Se não houver eventos para destacar, escolher 3 aleatorios
    if (events.length === 0) {
        const randomEvents = randomProject(filtrarEventoPorEstado("Publicado"), 3);

        randomEvents.forEach((event, index) => {
            renderEvent(event, index);
        });

    } else {
        // Renderizar eventos com state "Destacado"
        events.forEach((event, index) => {
            renderEvent(event, index);
        })
    }

}

function renderEvent(eventData, index) {
    
    // Remover caracteres especiais e espaço para não causar problemas
    const eventId = eventData.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');

    const EventCardsContainer = document.querySelector("#EventCardsContainer");
    const eventsControls = document.querySelector("#eventsControls");

    // Primeiro evento - separado para adicionar active class
    if (index === 0) {

        EventCardsContainer.innerHTML += 
        `
            <div class="carousel-item active" id="${eventId}">
                
                <div class="container text-justify" id="eventContainer">
                    
                    <div class="event-card d-flex ">
                        
                        <div class="card-interior" id="eventInterior">
                            <h2 class="card-title event-title">${eventData.name}</h2>
                            <p class="card-text event-description">
                                ${eventData.msgEvent}
                            </p>
                        </div>
                    
                        <a href="${eventData.link}" target="_blank" class="event-link align-self-end">+</a>

                    </div>

                </div>

            </div>
        `

        eventsControls.innerHTML += 
        `
            <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active"aria-current="true" aria-label="Slide 0"></button>
        `

    } else {
        EventCardsContainer.innerHTML += 
    `
        <div class="carousel-item" id="${eventId}">
            
            <div class="container text-justify" id="eventContainer">
                
                <div class="event-card d-flex ">
                    
                    <div class="card-interior" id="eventInterior">
                        <h2 class="card-title event-title">${eventData.name}</h2>
                        <p class="card-text event-description">
                            ${eventData.msgEvent}
                        </p>
                    </div>
                
                    <a href="${eventData.link}" target="_blank" class="event-link align-self-end">+</a>

                </div>

            </div>

        </div>
    `

    eventsControls.innerHTML += 
    `
        <button type="button" data-bs-target="#carousel" data-bs-slide-to="${index}" aria-label="Slide ${index}"></button>
    `
    }

}

// Eventos

// Alumni

function renderTestemunhos() {
    const alumniDestacado = filtrarTestemunhoPorEstado("Destacado");
    const alumniPublicado = filtrarTestemunhoPorEstado("Publicado");

    // Se não houver testemunhos para destacar, escolher 3 aleatorios
    if (alumniDestacado.length === 0) {
        const randomAlumni = randomProject(alumniPublicado, 4);

        randomAlumni.forEach((testemunho) => {
            renderAlumni(testemunho);
        });

    } else {
        // Renderizar testemunhos com state "Destacado"
        alumniDestacado.forEach((testemunho) => {
            renderAlumni(testemunho);
        })
    }

}

function renderAlumni(testemunho) {
    
    const testemunhosContainer = document.querySelector("#testemunhosContainer");

    testemunhosContainer.innerHTML += 
    `
        <div class="card alumniContainer" id="${testemunho.name}">
            <img class="img-fluid imageAlumni" alt="Foto de ${testemunho.name}" src="${testemunho.photo}">
            <div class="card-body alumniDescription">
                <p class="alumniJob">${testemunho.occupation}</p>
                <p class="alumniCompany">na ${testemunho.company}</p>
                <p class="alumniName">${testemunho.name} <button type="button" class="btn seeMoreAlumni text-warning fs-1 float-end" data-toggle="modal" data-target="#alumniModal" id="${testemunho.name}" style="padding:0;border:0;line-height:0.7;">+</button></p>
            </div>
        </div>
    `
}

function showModal(objeto,tipo) {
    
    let modalBody = document.querySelector("#modalIndexBody");
    let html = null;
    
    switch (tipo) {
        case "testemunho":
            
            const testemunho = getTestemunhoByName(testemunhoName);
        
            let awards = testemunho.awards;
        
            if (awards) {
                awards = awards.split(";").map(award => `<li class="awardsItem"><i class="fa-solid fa-medal" style="color:var(--color-yellow);"></i>${award.trim()}</li>`).join("");
            } else {
                awards = "";
            }

            html = 
            `
            <div class="row">
                <div class="col-sm-3">
                    <div class="card alumniContainer" id="${testemunho.name}">
                        <img class="img-fluid imageAlumni" alt="Foto de ${testemunho.name}" src="${testemunho.photo}">
                        <div class="card-body alumniDescription">
                            <p class="alumniJob">${testemunho.occupation}</p>
                            <p class="alumniCompany">na ${testemunho.company}</p>
                            <p class="alumniName">${testemunho.name}<a href="${testemunho.link}" target="_blank"><i class="fa-brands fa-linkedin-in float-end" id="linkedinIcon"></i></a></p>
                        </div>
                    </div>
                </div>
            
                <div class="col d-flex flex-column">
                    <span id="msgModalAlumni">${testemunho.msgAlumni}</span>

                    ${testemunho.awards ? `<ul id="awardsModalAlumni" style="list-style-type:none;padding:0;"><li>${awards}</li></ul>` : ""}
                </div>
            </div>
            `

            break;
        case "catalogo":

            
            break;
        default:
            break;
    }

    modalBody.innerHTML = `${html}`
   
    $("#indexModal").modal("show");

    // Esconder modal ao clicar no -
    document.querySelector("#seeLessAlumni").addEventListener("click", hideModal);

}

function hideModal() {
    $("#indexModal").modal("hide");
}

// Função que adiciona event listeneres ao botão para ver mais
function seeMoreClick() {

    const seeMoreBtns = document.getElementsByClassName("seeMoreAlumni");

    for (const button of seeMoreBtns) {
        // button.addEventListener("click",showAlumniModal(button.id));
        button.addEventListener("click", () => {
            showModal(button.id,"testemunho");
        });

    }

}

// Alumni



// Iniciar
initProjetos()
renderProjects();
initEventos();
renderEvents();
initAlumni();
renderTestemunhos();
seeMoreClick();