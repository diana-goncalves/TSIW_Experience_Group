import * as Event from "../../models/EventModel.js"

// Variavel criada para distinguir entre editar e adicionar evento
let currentEditingEvent = null;

// Form submit para editar e adicionar eventos
function submitForm() {
    const form = document.querySelector("#formEventos");
    const fileInput = document.querySelector("#fileInputEvents");
    const previewImg = document.querySelector("#imgPreviewEvent");
    
    form.addEventListener("submit",(event) => {
        event.preventDefault();

        const imgData = fileInput.files[0];
        
        // Guardar valores dos inputs
        const eventData = {
            name: document.querySelector("#formNomeE").value,
            msgEvent: document.querySelector("#formMsgE").value,
            date: document.querySelector("#formDataE").value,
            link: document.querySelector("#formLinkE").value, 
        }
        
        if (imgData) {
            // Criar instancia do file reader que converte a imagem para string
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                
                resizeImage(reader.result, (resizedImg) => {
                    eventData.photo = resizedImg;

                    submitEvent(eventData);
                }) 
                
            })

            reader.readAsDataURL(imgData);

        } else {
            // Se não tiver imagem
            eventData.photo = null;

            submitEvent(eventData);
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

function submitEvent(eventData) {
    try {
        
        if (currentEditingEvent) {
            // Editar evento 

            Event.editEvent(currentEditingEvent, eventData);
            customToast("Evento editado com sucesso!");

        } else {
            // Adicionar evento

            Event.addEvents(eventData.name, eventData.msgEvent, eventData.date, eventData.link, eventData.photo);
            customToast("Evento adicionado com sucesso!")
        }

        // limpar variavel que "avisa" se é para editar ou adicionar evento
        currentEditingEvent = null;
        // limpar inputs
        document.querySelector("#formEventos").reset();
        // atualizar tabela
        renderTableEvents(Event.getEvents());

    } catch (error) {
        customToast(error.message);
    } 

}

// Esta função está encarregue de ir buscar os dados do evento e colocar nos inputs e adicionar o botão para cancelar edição. 

function editEvent(eventName) {
    
    const event = Event.getEventByName(eventName);

    if (event) {
        currentEditingEvent = eventName;
        
        document.querySelector("#formNomeE").value = event.name;
        document.querySelector("#formLinkE").value = event.link;
        document.querySelector("#formDataE").value = event.date;
        document.querySelector("#formMsgE").value = event.msgEvent;

        document.querySelector("#imgPreviewEvent").src = event.photo ? event.photo : "../../../media/img/ImagePlaceholder.png";
        document.querySelector("#imgPreviewEvent").style.display = "block";

        document.querySelector("#cancelEditEvent").style.display = "block";

    }
   
}

function initCancelButton() {
    
    const form = document.querySelector("#formEventos");
    const cancelEditP = document.querySelector("#cancelEditEvent");
    const img = document.querySelector("#imgPreviewEvent");
    
    
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
        currentEditingEvent = null;
    })

    form.addEventListener("submit", () => {
        cancelEditP.style.display = "none";
        img.style.display = "none";
    })

}

// Form submit para editar e adicionar eventos

function renderTableEvents(events = []) {
    
    const tabelaEvents = document.querySelector("#tBodyEvents");
    
    // Limpar tabela primeiro
    tabelaEvents.innerHTML = "";
    
    // Caso não encontre users ( filtro não encontra nenhum nome igual )
    if (events.length === 0) {
        tabelaEvents.innerHTML = 
        `
            <tr>
                <td colspan="7" style="text-align:center;">Não foram encontrados eventos!</td>
            </tr>
        `
        return;
    }
    
    events.forEach(event => {
     
        let eventId = event.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
        
        tabelaEvents.innerHTML += 
        `
            <tr id="${eventId}">
                <td>${event.name}</td>
                <td>${event.msgEvent}</td>
                <td style="text-align: center;">${event.date}</td>
                <td style="text-align: center;">${event.link ? 'Sim' : 'Não'}</td>
                <td style="text-align: center;">${event.photo ? 'Sim' : 'Não'}</td>
                <td style="text-align: center;" class="${event.state}">${event.state}</td>
                <td style="text-align: center;">
                    
                    <div class="dropdown">
                        
                        <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false"  style="color:var(--color-yellow);border:0;">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>

                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item removeE" id="${event.name}"">Remover</a></li>
                            <li><a class="dropdown-item editarE" id="${event.name}">Editar</a></li>
                            <li><a class="dropdown-item publicarE" id="${event.name}">Publicar</a></li>
                            <li><a class="dropdown-item destacarE" id="${event.name}">Destacar</a></li> 
                            <li><a class="dropdown-item ocultarE" id="${event.name}">Ocultar</a></li>
                        </ul>

                    </div>
                   
                </td>
            </tr>
        `
    });

    // Event listeners
    tableEvents();

}

function filterByName() {
    // Procurar evento pelo nome automatico
    const filterInputEvents = document.querySelector("#procuraEventos");

    filterInputEvents.addEventListener("input", () => {
        renderTableEvents(Event.getEvents(filterInputEvents.value));
    })

}

function postEvent(eventName) {

    editState(eventName,"Publicado");

}

function hideEvent(eventName) {
    
    editState(eventName,"Oculto");

}

function highlightEvent(eventName) {

    editState(eventName,"Destacado");

}

function editState(eventName, newState) {
    // Alterar estado na local storage e atualizar tabela

    let events = Event.getEvents();
    
    // Encontrar index no Events array
    let EventIndex = events.findIndex(event => event.name === eventName);

    if (EventIndex !== -1) {
        
        // Mudar estado do evento 
        events[EventIndex].state = newState;
        
        // Atualizar local storage
        localStorage.setItem("events", JSON.stringify(events));
        
        // Atualizar tabela
        renderTableEvents(events);

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
        
    // Clicar no botão remover evento
    const btnsRemoveE = document.getElementsByClassName("removeE");

    for (const button of btnsRemoveE) {
        button.addEventListener("click", () => {
            if(confirm("Queres mesmo remover o evento?")) {
                
                Event.removeEvents(button.id);

                renderTableEvents(Event.getEvents());
                
                customToast("Evento removido com sucesso!");

            }
        })
    }

    // Clicar no botão editar 
    const btnsEditarE = document.getElementsByClassName("editarE");

    for (const button of btnsEditarE) {
        button.addEventListener("click", () => {
           
            editEvent(button.id);
            
        })
    }

    // Clicar no botão publicar
    const btnsPublicarE = document.getElementsByClassName("publicarE");

    for (const button of btnsPublicarE) {
        button.addEventListener("click", () => {
            
            postEvent(button.id);
            customToast("Evento publicado com sucesso!");
            
        })
    }

    // Clicar no botão ocultar
    const btnsOcultarE = document.getElementsByClassName("ocultarE");

    for (const button of btnsOcultarE) {
        button.addEventListener("click", () => {
            
            hideEvent(button.id);  
            customToast("Evento ocultado com sucesso!"); 
            
        })
    }

    // Clicar no botão destacar
    const btnsDestacarE = document.getElementsByClassName("destacarE");

    for (const button of btnsDestacarE) {
         button.addEventListener("click", () => {
             
            highlightEvent(button.id);
            customToast("Evento destacado com sucesso!");
             
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
    const tHeader = document.querySelector("#tHeadEvents");
    const tHeaders = tHeader.querySelectorAll("th");
    
    tHeaders.forEach(header => {
        const headerIndex = parseInt(header.getAttribute("id"));
        
        // Excluir coluna com botão para gerir eventos
        if (headerIndex != 6) {
            header.style.cursor = "pointer"; // Mudar cursor para indicar elemento "clicavel"
        
            header.addEventListener("click", () => {
                isSorted = !isSorted;
                console.log(isSorted);
                sortTable(headerIndex, isSorted);
            })
        }

    });    
}

let original = null;
function sortTable(colIndex, isSorted) {

    let events = Event.getEvents();

    if ( original === null) {
        // Criar uma cópia dos eventos antes de organizar
        original = events.slice();
    }

    // Voltar à ordem original
    if (!isSorted) {
        renderTableEvents(original);
        return;
    }

   events.sort((a,b) => {
    let aContent = null;
    let bContent = null;

    switch (colIndex) {
        case 0:
            // Coluna nome
            aContent = a.name;
            bContent = b.name;

            break;
        case 1:
            // Coluna mensagem
            aContent = a.msgEvent;
            bContent = b.msgEvent;
            
            break;
        case 2:
            // Coluna data
            aContent = new Date(a.date);
            bContent = new Date(b.date);
            
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

   renderTableEvents(events);

}



// // INICIAR
Event.init()

renderTableEvents(Event.getEvents());

submitForm();

filterByName();

initCancelButton();

