import setItems from "../views/inventoryView.js"
import setCollectibles from "../views/collectiblesView.js"
import GameStateView from "../views/GameStateView.js";

// função para por as imagens responsivas
$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});

function sala202View() {
    
    //GameStateView("hall 1");
    // Mete os items na sala
    setItems("sala 202");
    setCollectibles("sala 202")
    //--------------------------------------------------------------------
    //map das portas
    const sala202ComputerArea = document.querySelector("#sala202Computer");
    const salaPortaArea = document.querySelector("#sala202Porta");
    const imgSaida = document.querySelector(".imgSaida");
    const imgComputador = document.querySelector(".imgComputador");

    // listener para criar o efeito de hover
    sala202ComputerArea.addEventListener("mouseenter", (e)=> {
        e.preventDefault();
        imgComputador.style.display = "block";
    });

    sala202ComputerArea.addEventListener("mouseleave",(e)=>{
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

sala202View();
//--------------------------------------------------------------------
