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
    // if (checkGameCompleted("minigame1")) {   
        setItems("sala 203");
        setCollectibles("sala 203")
    // }
    //--------------------------------------------------------------------
    //map das portas
    const sala203QuadroArea = document.querySelector("#sala203Quadro");
    const salaPortaArea = document.querySelector("#sala203Porta");
    const imgSaida = document.querySelector(".imgSaida");
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
}

sala203View();
//--------------------------------------------------------------------
