import setItems from "../views/inventoryView.js";
import setCollectibles from "../views/collectiblesView.js";
import GameStateView from "./GameStateView.js";
import {checkItemInventory} from "../models/inventoryModel.js"

// função para por as imagens responsivas
$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});

let noKey =  new bootstrap.Modal(document.querySelector("#noKeyModal"));

function hall2View() {

    GameStateView("hall 2");
    // Mete os items na sala
    setItems("hall 2");
    setCollectibles("hall 2");
    //--------------------------------------------------------------------
    // PORTA ESQUERDA
    const hall2LeftArea = document.querySelector("#hall2Left");
    const imgLeft = document.querySelector(".imgLeft");

    // PORTA DIREITA
    const hall2RightArea = document.querySelector("#hall2Right");
    const imgRight = document.querySelector(".imgRight"); 

    // CORREDOR FRENTE
    const hall2FrontArea = document.querySelector("#hall2tohall3");
    const imgFront = document.querySelector(".imgFront");

    // CORREDOR ATRAS
    const hall2BackArea = document.querySelector("#hall2tohall1");
    const imgBack = document.querySelector(".imgBack");


    // PARA APARECER O RELEVO NA PORTA ESQUERDA
    hall2LeftArea.addEventListener("mouseenter", (e)=> {
        e.preventDefault();
        imgLeft.style.display = "block";
    });

    hall2LeftArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgLeft.style.display = "none";
    });

    // PARA APARECER O RELEVO NA PORTA DIREITA
    hall2RightArea.addEventListener("mouseenter",(e)=>{
        e.preventDefault();
        imgRight.style.display="block";
    });

    hall2RightArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgRight.style.display="none";
    });

    // PARA APARECER O RELEVO NO CORREDOR FRENTE
    hall2FrontArea.addEventListener("mouseenter",(e)=>{
        e.preventDefault();
        imgFront.style.display="block";
    });

    hall2FrontArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgFront.style.display="none";
    });

    // PARA APARECER O RELEVO NO CORREDOR EM BAIXO
    hall2BackArea.addEventListener("mouseenter",(e)=>{
        e.preventDefault();
        imgBack.style.display="block";
    });

    hall2BackArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgBack.style.display="none";
    });       
    
    hall2LeftArea.addEventListener("click", (e)=>{
        if (checkItemInventory("chave 206")) {
            location.href="./Sala206.html"
        } else {
            noKey.show();
        }
    })
}

hall2View();

//--------------------------------------------------------------------
