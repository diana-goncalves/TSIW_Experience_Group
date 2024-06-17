import setItems from "./inventoryView.js"
import setCollectibles from "./collectiblesView.js"
import GameStateView from "./GameStateView.js";

// função para por as imagens responsivas
$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});

function sala210View() {
    0
    GameStateView("sala 210");
    // Mete os items na sala
    setItems("sala 210");
    setCollectibles("sala 210")
    //--------------------------------------------------------------------
    //map das portas
    const sala210ComputerArea = document.querySelector("#sala210Computer");
    const salaPortaArea = document.querySelector("#sala210Porta");
    const imgSaida = document.querySelector(".imgSaida");
    const imgComputador = document.querySelector(".imgComputador");

    // listener para criar o efeito de hover
    sala210ComputerArea.addEventListener("mouseenter", (e)=> {
        e.preventDefault();
        imgComputador.style.display = "block";
    });

    sala210ComputerArea.addEventListener("mouseleave",(e)=>{
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

sala210View();
//--------------------------------------------------------------------
