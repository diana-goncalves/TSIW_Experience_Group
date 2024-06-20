import * as Collectible from "../../models/collectiblesModel.js";

// Variaveis que gerem páginas das tabelas
const tableRows = 5;
let currentPage = 1;
let totalPages = 1;

// Form submit para editar e adicionar colecionaveis
function submitColectibles() {
    const form = document.querySelector("#formCol");
    const fileInput = document.querySelector("#fileInputColecionaveis");
    const previewImg = document.querySelector("#imgPreviewCol");
    
    form.addEventListener("submit",(event) => {
        event.preventDefault();

        const imgData = fileInput.files[0];
        
        // Guardar valores dos inputs
        const colData = {
            nome: document.querySelector("#formNomeCol").value,
            sala: document.querySelector("#formSalaCol").value,
            largura: document.querySelector("#formLarguraCol").value,
            altura: document.querySelector("#formAlturaCol").value,
            x: document.querySelector("#formPosxCol").value,
            y: document.querySelector("#formPosyCol").value,
            photo: previewImg.src
        }
        
        // Criar instancia do file reader que converte a imagem para string
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            
            resizeImage(reader.result, (resizedImg) => {
                colData.photo = resizedImg;

                submitCol(colData);
            }) 
            
        })

        reader.readAsDataURL(imgData);
        
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

function submitCol(colData) {
    try {
        // Adicionar colecionavel
        Collectible.addCollectible(colData.largura, colData.altura, colData.x, colData.y, colData.nome, colData.photo, colData.sala);
        customToast("Colecionável adicionado com sucesso!")

        // limpar inputs
        document.querySelector("#formCol").reset();
        // atualizar tabela
        // renderTableProjects(Project.getProjects(), currentPage);

    } catch (error) {
        customToast(error.message);
    } 

}

function initCancelButton() {
    
    const form = document.querySelector("#formCol");
    const cancelEditCol = document.querySelector("#cancelEditCol");
    const img = document.querySelector("#imgPreviewCol");
    
    
    form.addEventListener("input", () => {
        
        const inputs = form.querySelectorAll("input[type='text']");
        let verificarValores = false;

        inputs.forEach(input => {
            if(input.value.trim() !== "") {
                verificarValores = true;
            }
        })
          
        // adicionar/remover botão para dar reset ao form. Se os inputs tiverem algum valor, adiciona o botão, se estiverem vazios, remove.
        cancelEditCol.style.display = verificarValores ? "block" : "none";

    })

    // remover botão depois de dar reset
    cancelEditCol.addEventListener("click", () => {
        cancelEditCol.style.display = "none";
        // remover image preview
        img.style.display = "none";
    })

    form.addEventListener("submit", () => {
        cancelEditCol.style.display = "none";
        img.style.display = "none";
    })

}

// Form submit para editar e adicionar colecionaveis

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

// INICIAR
Collectible.init()

submitColectibles();

initCancelButton();

//Minigame 4
function submitMiniGame4() {
    let formMini4 = document.querySelector(".formMinigame4");

    let Decimal = document.querySelector("#formDecimal");
    let binarioPosicions = document.querySelectorAll(".formBinario")
    let opts = []

    formMini4.addEventListener("submit", (e)=>{
        e.preventDefault();

        if(localStorage.minigame4) {
            const temp = JSON.parse(localStorage.minigame4);
            temp.forEach(element => {
                opts.push(element);
            });
        }
        let object = {
            binario: [binarioPosicions[0].value,binarioPosicions[1].value,
                binarioPosicions[2].value,binarioPosicions[3].value,
                binarioPosicions[4].value,binarioPosicions[5].value, binarioPosicions[6].value],
            decimal: Decimal.value
        }
        opts.push(object);

        localStorage.setItem("minigame4", JSON.stringify(opts));
    });
}
submitMiniGame4();

//Minigame 3.