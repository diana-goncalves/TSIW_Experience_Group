import * as Alumni from "../../models/AlumniModel.js"

// Variavel criada para distinguir entre editar e adicionar testemunho
let currentEditingAlumni = null;

// Form submit para editar e adicionar testemunhos
function submitForm() {
    const form = document.querySelector("#formAlumni");
    const fileInput = document.querySelector("#fileInputTestemunhos");
    const previewImg = document.querySelector("#imgPreviewAlumni");
    
    form.addEventListener("submit",(event) => {
        event.preventDefault();

        const imgData = fileInput.files[0];
        
        // Guardar valores dos inputs
        const alumniData = {
            name: document.querySelector("#formNomeT").value,
            msgAlumni: document.querySelector("#formMsgT").value,
            company: document.querySelector("#formEmpresa").value,
            awards: document.querySelector("#formPremios").value,
            occupation: document.querySelector("#formOcupacao").value,
            link: document.querySelector("#formLinkedIn").value,
            photo: previewImg.src  
        }
        
        if (imgData) {
            // Criar instancia do file reader que converte a imagem para string
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                
                resizeImage(reader.result, (resizedImg) => {
                    alumniData.photo = resizedImg;

                    submitAlumni(alumniData);
                }) 
                
            })

            reader.readAsDataURL(imgData);

        } else {
            // Se não tiver imagem
            submitAlumni(alumniData);
        }
        
    });

    fileInput.addEventListener("change", (testemunho) => {
        const imgData = testemunho.target.files[0];

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

function submitAlumni(alumniData) {
    try {
        
        if (currentEditingAlumni) {
            // Editar testemunho 

            Alumni.editTestemunho(currentEditingAlumni, alumniData);
            customToast("Testemunho editado com sucesso!");

        } else {
            // Adicionar testemunho

            Alumni.addTestemunho(alumniData.name, alumniData.msgAlumni, alumniData.company, alumniData.awards, alumniData.occupation, alumniData.link, alumniData.photo, alumniData.state);
            customToast("Testemunho adicionado com sucesso!")
        }

        // limpar variavel que "avisa" se é para editar ou adicionar testemunho
        currentEditingAlumni = null;
        // limpar inputs
        document.querySelector("#formAlumni").reset();
        // atualizar tabela
        renderTableAlumni(Alumni.getAlumnis());

    } catch (error) {
        customToast(error.message);
    } 

}

// Esta função está encarregue de ir buscar os dados do alumni e colocar nos inputs e adicionar o botão para cancelar edição. 

function editAlumni(alumniName) {
    
    const alumni = Alumni.getTestemunhoByName(alumniName);

    if (alumni) {
        currentEditingAlumni = alumniName;
        
        document.querySelector("#formNomeT").value = alumni.name;
        document.querySelector("#formMsgT").value = alumni.msgAlumni;
        document.querySelector("#formEmpresa").value = alumni.company;
        document.querySelector("#formPremios").value = alumni.awards;
        document.querySelector("#formOcupacao").value = alumni.occupation;
        document.querySelector("#formLinkedIn").value = alumni.link;

        document.querySelector("#imgPreviewAlumni").src = alumni.photo ? alumni.photo : "../../../media/img/ImagePlaceholder.png";
        document.querySelector("#imgPreviewAlumni").style.display = "block";

        document.querySelector("#cancelEditAlumni").style.display = "block";

    }
   
}

function initCancelButton() {
    
    const form = document.querySelector("#formAlumni");
    const cancelEdit = document.querySelector("#cancelEditAlumni");
    const img = document.querySelector("#imgPreviewAlumni");
    
    
    form.addEventListener("input", () => {
        
        const inputs = form.querySelectorAll("input[type='text']");

        let verificarValores = false;

        inputs.forEach(input => {
            if(input.value.trim() !== "") {
                verificarValores = true;
            }
        })
        
        
        // adicionar/remover botão para dar reset ao form. Se os inputs tiverem algum valor, adiciona o botão, se estiverem vazios, remove.
        cancelEdit.style.display = verificarValores ? "block" : "none";

    })

    // remover botão depois de dar reset
    cancelEdit.addEventListener("click", () => {
        cancelEdit.style.display = "none";
        // remover image preview
        img.style.display = "none";
        currentEditingAlumni = null;
    })

    form.addEventListener("submit", () => {
        cancelEdit.style.display = "none";
        img.style.display = "none";
    })

}

// Form submit para editar e adicionar testemunhos

function renderTableAlumni(alumni = []) {
    
    const tabelaAlumni = document.querySelector("#tBodyTestemunhos");
    
    // Limpar tabela primeiro
    tabelaAlumni.innerHTML = "";
    
    // Caso não encontre users ( filtro não encontra nenhum nome igual )
    if (alumni.length === 0) {
        tabelaAlumni.innerHTML = 
        `
            <tr>
                <td colspan="9" style="text-align:center;">Não foram encontrados testemunhos!</td>
            </tr>
        `
        return;
    }
    
    alumni.forEach(testemunho => {
     
        let alumniId = testemunho.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
        
        tabelaAlumni.innerHTML += 
        `
            <tr id="${alumniId}">
                <td>${testemunho.name}</td>
                <td>${testemunho.msgAlumni}</td>
                <td>${testemunho.company}</td>
                <td>${testemunho.awards ? testemunho.awards : "Não tem"}</td>
                <td>${testemunho.occupation}</td>
                <td style="text-align: center;">${testemunho.link ? 'Sim' : 'Não'}</td>
                <td style="text-align: center;">${testemunho.photo ? 'Sim' : 'Não'}</td>
                <td style="text-align: center;" class="${testemunho.state}">${testemunho.state}</td>
                <td style="text-align: center;">
                    
                    <div class="dropdown">
                        
                        <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false"  style="color:var(--color-yellow);border:0;">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>

                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item removeT" id="${testemunho.name}"">Remover</a></li>
                            <li><a class="dropdown-item editarT" id="${testemunho.name}">Editar</a></li>
                            <li><a class="dropdown-item publicarT" id="${testemunho.name}">Publicar</a></li>
                            <li><a class="dropdown-item destacarT" id="${testemunho.name}">Destacar</a></li> 
                            <li><a class="dropdown-item ocultarT" id="${testemunho.name}">Ocultar</a></li>
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
    // Procurar alumni pelo nome automatico
    const filterInputAlumni = document.querySelector("#procuraTestemunhos");

    filterInputAlumni.addEventListener("input", () => {
        renderTableAlumni(Alumni.getAlumnis(filterInputAlumni.value));
    })

}

function postAlumni(alumniName) {

    editState(alumniName,"Publicado");

}

function hideAlumni(alumniName) {
    
    editState(alumniName,"Oculto");

}

function highlightAlumni(alumniName) {

    editState(alumniName,"Destacado");

}

function editState(alumniName, newState) {
    // Alterar estado na local storage e atualizar tabela

    let alumnis = Alumni.getAlumnis();
    
    // Encontrar index no alumnis array
    let alumniIndex = alumnis.findIndex(testemunho => testemunho.name === alumniName);

    if (alumniIndex !== -1) {
        
        // Mudar estado do alumni
        alumnis[alumniIndex].state = newState;
        
        // Atualizar local storage
        localStorage.setItem("alumnis", JSON.stringify(alumnis));
        
        // Atualizar tabela
        renderTableAlumni(alumnis);

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
        
    // Clicar no botão remover testemunho
    const btnsRemoveT = document.getElementsByClassName("removeT");

    for (const button of btnsRemoveT) {
        button.addEventListener("click", () => {
            if(confirm("Queres mesmo remover o testemunho?")) {
                
                Alumni.removerTestemunho(button.id);

                renderTableAlumni(Alumni.getAlumnis());
                
                customToast("Testemunho removido com sucesso!");

            }
        })
    }

    // Clicar no botão editar 
    const btnsEditarT = document.getElementsByClassName("editarT");

    for (const button of btnsEditarT) {
        button.addEventListener("click", () => {
           
            editAlumni(button.id);
            
        })
    }

    // Clicar no botão publicar
    const btnsPublicarT = document.getElementsByClassName("publicarT");

    for (const button of btnsPublicarT) {
        button.addEventListener("click", () => {
            
            postAlumni(button.id);
            customToast("Testemunho publicado com sucesso!");
            
        })
    }

    // Clicar no botão ocultar
    const btnsOcultarT = document.getElementsByClassName("ocultarT");

    for (const button of btnsOcultarT) {
        button.addEventListener("click", () => {
            
            hideAlumni(button.id);  
            customToast("Testemunho ocultado com sucesso!"); 
            
        })
    }

    // Clicar no botão destacar
    const btnsDestacarT = document.getElementsByClassName("destacarT");

    for (const button of btnsDestacarT) {
         button.addEventListener("click", () => {
             
            highlightAlumni(button.id);
            customToast("Testemunho destacado com sucesso!");
             
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
    const tHeader = document.querySelector("#tHeadTestemunhos");
    const tHeaders = tHeader.querySelectorAll("th");
    
    tHeaders.forEach(header => {
        const headerIndex = parseInt(header.getAttribute("id"));
        
        // Excluir coluna com botão para gerir testemunhos
        if (headerIndex != 8) {
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

    let alumnis = Alumni.getAlumnis();

    console.log(alumnis);

    if ( original === null) {
        // Criar uma cópia dos alumnis antes de organizar
        original = alumnis.slice();
    }

    // Voltar à ordem original
    if (!isSorted) {
        renderTableAlumni(original);
        return;
    }

   alumnis.sort((a,b) => {
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
            aContent = a.msgAlumni;
            bContent = b.msgAlumni;
            
            break;
        case 2:
            // Coluna empresa
            aContent = a.company;
            bContent = b.company;
            
            break;
        case 3:
            // Coluna prémios
            aContent = a.awards ? a.awards : "Não";
            bContent = b.awards ? b.awards : "Não";
            
            break;
        case 4:
            // Coluna trabalho
            aContent = a.occupation;
            bContent = b.occupation;
            
            break;
        case 5:
            // Coluna link
            aContent = a.link ? "Sim" : "Não";
            bContent = b.link ? "Sim" : "Não";
            
            break;
        case 6:
            // Coluna imagem
            aContent = a.photo ? "Sim" : "Não";
            bContent = b.photo ? "Sim" : "Não";
            
            break;
        case 7:
            // Coluna estado
            aContent = a.state;
            bContent = b.state;
            
            break;
        default:
            return 0;
    }

    // Transformar em minusculas antes de organizar
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

   renderTableAlumni(alumnis);

}



// // INICIAR
Alumni.init();

renderTableAlumni(Alumni.getAlumnis());

submitForm();

filterByName();

initCancelButton();

