import setItems from "../views/inventoryView.js"
import setCollectibles from "../views/collectiblesView.js"
import GameStateView from "../views/GameStateView.js";

// função para por as imagens responsivas
$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});

function sala2011View() {
    
    //GameStateView("hall 1");
    // Mete os items na sala
    setItems("sala 211");
    setCollectibles("sala 211")
    //--------------------------------------------------------------------
    //map das portas
    const sala211ComputerArea = document.querySelector("#sala211Computer");
    const salaPortaArea = document.querySelector("#sala211Porta");
    const imgSaida = document.querySelector(".imgSaida");
    const imgComputador = document.querySelector(".imgComputador");

    // listener para criar o efeito de hover
    sala211ComputerArea.addEventListener("mouseenter", (e)=> {
        e.preventDefault();
        imgComputador.style.display = "block";
    });

    sala211ComputerArea.addEventListener("mouseleave",(e)=>{
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

sala2011View();
//--------------------------------------------------------------------
