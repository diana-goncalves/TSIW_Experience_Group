import setItems from "../views/inventoryView.js";
import setCollectibles from "../views/collectiblesView.js";
import GameStateView from "./GameStateView.js";
import {checkItemInventory} from "../models/inventoryModel.js"

// função para por as imagens responsivas
$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});

let noKey =  new bootstrap.Modal(document.querySelector("#noKeyModal"));

function hall3View() {

    GameStateView("hall 3");
    // Mete os items na sala
    setItems("hall 3");
    setCollectibles("hall 3")
    //--------------------------------------------------------------------
    // PORTA ESQUERDA
    const hall3LeftArea = document.querySelector("#hall3Left");
    const imgLeft = document.querySelector(".imgLeft");

    // PORTA DIREITA
    const hall3RightArea = document.querySelector("#hall3Right");
    const imgRight = document.querySelector(".imgRight"); 

    // CORREDOR ATRAS
    const hall3BackArea = document.querySelector("#hall3tohall2");
    const imgBack = document.querySelector(".imgBack");


    // PARA APARECER O RELEVO NA PORTA ESQUERDA
    hall3LeftArea.addEventListener("mouseenter", (e)=> {
        e.preventDefault();
        imgLeft.style.display = "block";
    });

    hall3LeftArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgLeft.style.display = "none";
    });

    // PARA APARECER O RELEVO NA PORTA DIREITA
    hall3RightArea.addEventListener("mouseenter",(e)=>{
        e.preventDefault();
        imgRight.style.display="block";
    });

    hall3RightArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgRight.style.display="none";
    });

    // PARA APARECER O RELEVO NO CORREDOR EM BAIXO
    hall3BackArea.addEventListener("mouseenter",(e)=>{
        e.preventDefault();
        imgBack.style.display="block";
    });

    hall3BackArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgBack.style.display="none";
    });  
    
    hall3LeftArea.addEventListener("click", (e)=>{
        if (checkItemInventory("chave 210")) {
            location.href="./Sala210.html"
        } else {
            noKey.show();
        }
    })

    hall3RightArea.addEventListener("click", (e)=>{
        if (checkItemInventory("chave 211")) {
            location.href="./Sala211.html"
        } else {
            noKey.show();
        }
    })
}
hall3View();

//--------------------------------------------------------------------
