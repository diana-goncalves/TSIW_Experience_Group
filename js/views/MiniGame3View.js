import {init,addgamesCompleted,checkGameCompleted} from "../models/gameStateModel.js"


let options = [
    {
        nome: "CSS",
        certo: `../../media/img/ER-assets/mini-game1/css1.png`,
        opt: [`../../media/img/ER-assets/mini-game1/css1.png`,`../../media/img/ER-assets/mini-game1/css2.png`,`../../media/img/ER-assets/mini-game1/css3.png`,`../../media/img/ER-assets/mini-game1/css4.png`]
    },
    {
        nome: "HTML",
        certo: `../../media/img/ER-assets/mini-game1/html1.png`,
        opt: [`../../media/img/ER-assets/mini-game1/html2.png`,`../../media/img/ER-assets/mini-game1/html3.png`,`../../media/img/ER-assets/mini-game1/html4.png`,`../../media/img/ER-assets/mini-game1/html1.png`]
    },
    {
        nome: "vscode",
        certo: `../../media/img/ER-assets/mini-game1/vscode1.png`,
        opt: [`../../media/img/ER-assets/mini-game1/vscode1.png`,`../../media/img/ER-assets/mini-game1/vscode2.png`,`../../media/img/ER-assets/mini-game1/vscode3.png`,`../../media/img/ER-assets/mini-game1/vscode4.png`]
    },
    {
        nome: "Arduino",
        certo: `../../media/img/ER-assets/mini-game1/arduino1.png`,
        opt: [`../../media/img/ER-assets/mini-game1/arduino2.png`,`../../media/img/ER-assets/mini-game1/arduino3.png`,`../../media/img/ER-assets/mini-game1/arduino1.png`,`../../media/img/ER-assets/mini-game1/arduino4.png`]
    },
    {
        nome: "Bootstrap",
        certo: `../../media/img/ER-assets/mini-game1/bootstrap1.png`,
        opt: [`../../media/img/ER-assets/mini-game1/bootstrap2.png`,`../../media/img/ER-assets/mini-game1/bootstrap3.png`,`../../media/img/ER-assets/mini-game1/bootstrap4.png`,`../../media/img/ER-assets/mini-game1/bootstrap1.png`]
    },
    {
        nome: "Python",
        certo: `../../media/img/ER-assets/mini-game1/python1.png`,
        opt: [`../../media/img/ER-assets/mini-game1/python1.png`,`../../media/img/ER-assets/mini-game1/python2.png`,`../../media/img/ER-assets/mini-game1/python3.png`,`../../media/img/ER-assets/mini-game1/python4.png`]
    }
];
init();
let Exercise = [];
let progress = 1;
let modalGame =  new bootstrap.Modal(document.querySelector("#miniGame2"));
let modalIntro =  new bootstrap.Modal(document.querySelector("#intro2"));
let gameDone =  new bootstrap.Modal(document.querySelector("#gameDone"));
let vitoria = new bootstrap.Modal(document.querySelector("#victoryModal"));


let startGame = () =>{  
    let index = Math.floor(Math.random() * options.length);//nao pode ter o mesmo index
    console.log(index);
    if (Exercise.some(element => element.certo == options[index].certo)) {
        startGame();
        console.log("dfdfs");
    }else{
        Exercise.push(options[index]); 
        document.querySelector(".logoName").textContent = options[index].nome;
        options[index].opt.forEach((element,i) => {
            let img = document.createElement("img");
            img.classList.add("w-50", "h-50", "logo");
            img.src = element;
            if (element == options[index].certo) {
                img.addEventListener("click", optionRight)
            }else{
                img.addEventListener("click",gameOver)
            }
            document.querySelector(`.card${i+1}`).appendChild(img)
        });
    }
}

function optionRight(e) { 
    progress += 33

    if (progress == 100) {
        modalGame.hide();
        vitoria.show();
        addgamesCompleted("game2");
        return;
    }
    let bar = document.querySelector(".progress-bar");
    bar.style.width = `${progress}%`;
    modalGame.hide();
    setTimeout(() => {
        modalGame.show();
    }, 500);
}
function gameOver(e) {
    progress = 1;
    document.querySelector(".progress-bar").style.width = `${progress}%`;
    modalGame.hide();
    setTimeout(() => {
        modalGame.show();
    }, 500);
    Exercise=[];
}


let resetGame = ()=>{
    for (let i = 1; i <= 4; i++) {
        document.querySelector(`.card${i}`).innerHTML = "";
    }
    Exercise = [];
}


document.querySelector("#sala206Computer").addEventListener("click", ()=>{
    if (!checkGameCompleted("game2")) {
        modalIntro.show();
    } else {
        gameDone.show();
    }
})


document.querySelector("#miniGame2").addEventListener('shown.bs.modal', () => {
    startGame();

})

document.querySelector("#miniGame2").addEventListener('hidden.bs.modal', () => {
    resetGame();
});


document.querySelector(".closeGame").addEventListener("click",() =>{
    progress = 1;
    document.querySelector(".progress-bar").style.width = `${progress}%`;
    Exercise=[];
})