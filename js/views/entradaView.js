let ModalInicial =  new bootstrap.Modal(document.querySelector("#modalInicial"))
let teste = new bootstrap.Toast(document.querySelector(".toast"))
let teste2 = new bootstrap.Toast(document.querySelector(".toast2"))

// função para por as imagens responsivas
$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});

// Porta Frente
const entradaFrontArea = document.querySelector("#entradatohall1");
const imgFront = document.querySelector(".imgFront");

// Area Direita
const entradaRightArea = document.querySelector("#entradaParque");
const imgRight = document.querySelector(".imgRight"); 

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
//--------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", (e)=>{
    e.preventDefault();
    setTimeout(() => {
        ModalInicial.show();

    }, 1000);
    teste.show();
    teste2.show();
})