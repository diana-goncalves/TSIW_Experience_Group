import setItems from "./inventoryView.js"
import setCollectibles from "./collectiblesView.js"
import GameStateView from "./GameStateView.js";


// função para por as imagens responsivas
$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});

function sala203View() {
    
    GameStateView("sala 203");
    // Mete os items na sala  
    setItems("sala 203");
    setCollectibles("sala 203")
    
    //--------------------------------------------------------------------
    //map das portas
    const sala203QuadroArea = document.querySelector("#sala203Quadro");
    const salaPortaArea = document.querySelector("#sala203Porta");
    const salaPcArea = document.querySelector("#sala203Pc1");
    const salaPc2Area = document.querySelector("#sala203Pc2");
    const imgSaida = document.querySelector(".imgSaida");
    const imgLeft = document.querySelector(".imgLeft");
    const imgRight = document.querySelector(".imgRight");
    const imgComputador = document.querySelector(".imgComputador");

    // listener para criar o efeito de hover
    sala203QuadroArea.addEventListener("mouseenter", (e)=> {
        e.preventDefault();
        imgComputador.style.display = "block";
    });

    sala203QuadroArea.addEventListener("mouseleave",(e)=>{
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

    salaPcArea.addEventListener("mouseenter",(e)=>{
        e.preventDefault();
        imgLeft.style.display="block"
    });

    salaPcArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgLeft.style.display="none"
    });
    
    salaPc2Area.addEventListener("mouseenter",(e)=>{
        e.preventDefault();
        imgRight.style.display="block"
    });

    salaPc2Area.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgRight.style.display="none"
    });
}

sala203View();
//--------------------------------------------------------------------
