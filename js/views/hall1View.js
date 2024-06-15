import setItems from "../views/inventoryView.js";
import setCollectibles from "../views/collectiblesView.js";
import GameStateView from "../views/GameStateView.js";
import {checkItemInventory} from "../models/inventoryModel.js"
import {checkGameCompleted} from "../models/gameStateModel.js"

// função para por as imagens responsivas
$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});
let noKey =  new bootstrap.Modal(document.querySelector("#noKeyModal"));
function hall1View() {

    GameStateView("hall 1");
    // Mete os items na sala
    if (checkGameCompleted == "") {   
        setItems("hall 1");
        setCollectibles("hall 1")   
    }
    //--------------------------------------------------------------------
    // PORTA ESQUERDA
    const hall1LeftArea = document.querySelector("#hall1Left");
    const imgLeft = document.querySelector(".imgLeft");
    
    // PORTA  DIREITA
    const hall1RightArea = document.querySelector("#hall1Right");
    const imgRight = document.querySelector(".imgRight"); 
    
    // CORREDOR FRENTE
    const hall1tohall2 = document.querySelector("#hall1tohall2");
    const imgFront = document.querySelector(".imgFront");
    
    hall1LeftArea.addEventListener("mouseenter", (e)=> {
        e.preventDefault();
        imgLeft.style.display = "block";
    });
    
    hall1LeftArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgLeft.style.display = "none";
    });
    
    hall1RightArea.addEventListener("mouseenter",(e)=>{
        e.preventDefault();
        imgRight.style.display="block"
    });
    
    hall1RightArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgRight.style.display="none"
    });
    
    hall1tohall2.addEventListener("mouseenter",(e)=>{
        e.preventDefault();
        imgFront.style.display="block"
    });
    
    hall1tohall2.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgFront.style.display="none"
    });            

    hall1LeftArea.addEventListener("click", (e)=>{
        if (checkItemInventory("chave 202")) {
            location.href="./Sala202.html"
        } else {
            noKey.show();
        }
    })

    hall1RightArea.addEventListener("click", (e)=>{
        if (checkItemInventory("chave 203")) {
            location.href="./Sala203.html"
        } else {
            noKey.show();
        }
    })
}

hall1View();


//--------------------------------------------------------------------
