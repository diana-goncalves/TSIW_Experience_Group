import GameStateView from "../views/GameStateView.js";
import { init as gameStateInit, NewGame } from "../models/gameStateModel.js";
import { init as inventoryInit, resetInventory } from "../models/inventoryModel.js";
import { init as collectiblesInit, resetCollectibles } from "../models/collectiblesModel.js";


let ModalInicial =  new bootstrap.Modal(document.querySelector("#modalInicial"))
let buttonStart = document.querySelector(".buttonStart");
const parqueModal = document.querySelector("#modalParque")
// Porta Frente
const entradaFrontArea = document.querySelector("#entradatohall1");
const imgFront = document.querySelector(".imgFront");
// Area Direita
const entradaRightArea = document.querySelector("#entradaParque");
const imgRight = document.querySelector(".imgRight"); 

// função para por as imagens responsivas
$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});

function entradaView() {
    gameStateInit();
    inventoryInit();
    collectiblesInit();
    //--------------------------------------------------------------------
    entradaFrontArea.addEventListener("mouseenter", (e)=> {
        e.preventDefault();
        imgFront.style.display = "block";
    });

    entradaFrontArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgFront.style.display = "none";
    });

    // PARA APARECER O RELEVO NA PORTA DIREITA
    entradaRightArea.addEventListener("mouseenter",(e)=>{
        e.preventDefault();
        imgRight.style.display="block";
    });

    entradaRightArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgRight.style.display="none";
    });

    parqueModal.addEventListener("shown.bs.modal",(e)=>{
        GameStateView("parque")
    })

    //--------------------------------------------------------------------


    document.addEventListener("DOMContentLoaded", (e)=>{
        e.preventDefault();    
        ModalInicial.show();
        if (sessionStorage.countdown) {
            sessionStorage.removeItem("countdown")
        }
        buttonStart.addEventListener("click",(e)=>{
            e.preventDefault();
            GameStateView("entrada");
            NewGame();
            resetInventory();
            resetCollectibles();
        })

    })
}

entradaView();
