$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});


const sala201ComputerArea = document.querySelector("#sala201Computer");
const salaPortaArea = document.querySelector("#salaPorta");
const imgSaida = document.querySelector(".imgSaida");
const imgComputador = document.querySelector(".imgComputador");

sala201ComputerArea.addEventListener("mouseenter", (e)=> {
    e.preventDefault();
    imgComputador.style.display = "block";
});

sala201ComputerArea.addEventListener("mouseleave",(e)=>{
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