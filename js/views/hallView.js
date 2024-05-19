$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});


//--------------------------------------------------------------------
const hall1LeftArea = document.querySelector("#hall1Left");
const hall1RightArea = document.querySelector("#hall1Right");
const imgLeft = document.querySelector(".imgLeft");
const imgRight = document.querySelector(".imgRight"); 

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


let toastTrigger = document.getElementById('liveToastBtn');
let toastLiveExample = document.getElementById('liveToast');

const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
toastTrigger.addEventListener('click', () => {
      toastBootstrap.show()
});
        

//--------------------------------------------------------------------
