import { init,getItemsRoom } from "../models/inventoryModel.js";

// Div onde vais os item
let itemZone = document.querySelector(".ItemZone");

// função para por as imagens responsivas
$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});

function setItems() {
    //iniciar dados
    init();
    // Vai bucar os items desta sala
    let roomItems = getItemsRoom("sala 201");
    roomItems.forEach(element => {
        // criar item
        let img = document.createElement('img');
        img.src = element.img;
        img.alt = element.name;
        img.id = element.name;
        img.className = 'img-fluid item';
        // posiçao do item na tela
        img.style.position = 'absolute';
        img.style.top = element.y;
        img.style.left = element.x;
        // colocação do item na tela
        itemZone.appendChild(img);
    });
}

setItems();
//--------------------------------------------------------------------
//map das portas
const sala201ComputerArea = document.querySelector("#sala201Computer");
const salaPortaArea = document.querySelector("#salaPorta");
const imgSaida = document.querySelector(".imgSaida");
const imgComputador = document.querySelector(".imgComputador");

// listener para criar o efeito de hover
sala201ComputerArea.addEventListener("mouseenter", (e)=> {
    e.preventDefault();
    imgComputador.style.display = "block";
});

sala201ComputerArea.addEventListener("mouseleave",(e)=>{
    e.preventDefault();
    imgComputador.style.display = "none";
});

salaPortaArea.addEventListener("mouseenter",(e)=>{
    e.preventDefault();
    imgSaida.style.display="block"
});

salaPortaArea.addEventListener("mouseleave",(e)=>{
    e.preventDefault();
    imgSaida.style.display="none"
});
//--------------------------------------------------------------------
