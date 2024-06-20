import {addgamesCompleted,checkGameCompleted,getCodeByIndex} from "../models/gameStateModel.js"

function fillOptions() {
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
    if (localStorage.minigame1) {
        const temp = JSON.parse(localStorage.minigame1);
        for (const ex of temp) {
            options.push(ex)
        }    
    }
}
let Exercise = [];
let progress = 1;
let modalGame =  new bootstrap.Modal(document.querySelector("#miniGame1"));
let modalIntro =  new bootstrap.Modal(document.querySelector("#intro1"));
let gameDone =  new bootstrap.Modal(document.querySelector("#gameDone"));
let vitoria = new bootstrap.Modal(document.querySelector("#victoryModal"));


let startGame = () =>{  
    let index = Math.floor(Math.random() * options.length);//nao pode ter o mesmo index
    if (Exercise.some(element => element.certo == options[index].certo)) {
        startGame();
    }else{
        Exercise.push(options[index]); 
        document.querySelector(".logoName").textContent = options[index].nome;
        options[index].opt.forEach((element,i) => {
            let img = document.createElement("img");
            img.classList.add("w-50", "h-50", "logo");
            img.src = element;
            if (element == options[index].certo) {
                document.querySelector(`.card${i+1}`).addEventListener("click", optionRight)
            }else{
                document.querySelector(`.card${i+1}`).addEventListener("click",gameOver)
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
        addgamesCompleted("minigame1");
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
    document.querySelector(".gameBoard").innerHTML =`
        <div class="up ">
            <button class="card1 m-2 "></button>
            <button class="card2 m-2 "></button>
        </div>
        <div class="down">
            <button class="card3 m-2 "></button>
            <button class="card4 m-2 "></button>
        </div>   
    `
}


document.querySelector("#sala202Computer").addEventListener("click", ()=>{
    if (!checkGameCompleted("minigame1")) {
        modalIntro.show();
    } else {
        gameDone.show();
    }
})


document.querySelector("#miniGame1").addEventListener('shown.bs.modal', () => {
    startGame();
})

document.querySelector("#miniGame1").addEventListener('hidden.bs.modal', () => {
    resetGame();
});


document.querySelector(".closeGame").addEventListener("click",() =>{
    progress = 1;
    document.querySelector(".progress-bar").style.width = `${progress}%`;
    Exercise=[];
})

document.querySelector("#gameDone").addEventListener('shown.bs.modal', () => {
    let outputs = document.querySelectorAll(".gameDoneCode");
    console.log(outputs);
    let code = getCodeByIndex(3);
    outputs[3].value = code;
})

document.querySelector("#gameDone").addEventListener('hidden.bs.modal', () => {
    let outputs = document.querySelectorAll(".gameDoneCode");
    outputs[3].innerHTML = "";
});

document.querySelector("#victoryModal").addEventListener('shown.bs.modal', () => {
    let outputs = document.querySelectorAll(".vitoryCode");
    let code = getCodeByIndex(3);
    outputs[3].value = code;
})

document.querySelector("#victoryModal").addEventListener('hidden.bs.modal', () => {
    let outputs = document.querySelectorAll(".vitoryCode");
    outputs[3].innerHTML = "";
    location.reload();
});