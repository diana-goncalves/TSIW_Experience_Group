import setItems from "./inventoryView.js"
import setCollectibles from "./collectiblesView.js"
import GameStateView from "./GameStateView.js";

// função para por as imagens responsivas
$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});

function sala207View() {
    
    GameStateView("sala 207");
    // Mete os items na sala
    setItems("sala 207");
    setCollectibles("sala 207");
    //--------------------------------------------------------------------
    //map das portas
    const sala207QuadroArea = document.querySelector("#sala207Quadro");
    const salaPortaArea = document.querySelector("#sala207Porta");
    const imgSaida = document.querySelector(".imgSaida");
    const imgComputador = document.querySelector(".imgComputador");

    // listener para criar o efeito de hover
    sala207QuadroArea.addEventListener("mouseenter", (e)=> {
        e.preventDefault();
        imgComputador.style.display = "block";
    });

    sala207QuadroArea.addEventListener("mouseleave",(e)=>{
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

sala207View();
//--------------------------------------------------------------------
