import setItems from "../views/inventoryView.js"
import setCollectibles from "../views/collectiblesView.js"
import GameStateView from "../views/GameStateView.js";

// função para por as imagens responsivas
$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});

function hall1View() {

    //GameStateView("hall 1");
    // Mete os items na sala
    setItems("hall 1");
    setCollectibles("hall 1")
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
}

hall1View();


//--------------------------------------------------------------------
