import {init,addgamesCompleted,checkGameCompleted} from "../models/gameStateModel.js"


let options = [
    {
        binario: ["0","0","0","1","0","1","0"],
        decimal: `10`,
    },{
        binario: ["0","1","1","1","0","0","0"],
        decimal: `56`,
    },{
        binario: ["0","0","1","1","0","0","0"],
        decimal: `24`,
    },{
        binario: ["0","0","0","0","0","1","0"],
        decimal: `2`,
    },{
        binario: ["0","0","1","1","1","1","0"],
        decimal: `30`,
    },{
        binario: ["0","1","0","1","1","1","0"],
        decimal: `46`,
    },
];
init();
let Exercise = [];
let progress = 1;
let level = 1;
let modalGame =  new bootstrap.Modal(document.querySelector("#miniGame4"));
let modalIntro =  new bootstrap.Modal(document.querySelector("#intro4"));
let gameDone =  new bootstrap.Modal(document.querySelector("#gameDone"));
let vitoria = new bootstrap.Modal(document.querySelector("#victoryModal"));


let startGame = () =>{  
    for (let index = 1; index <= progress; index++) {
        let versao = Math.floor(Math.random());//nao pode ter o mesmo index
        console.log(versao);
        switch (versao) {
            case 0:
                gameVersion1();
                break;
            case 1:
                gameVersion2();
                break;
        
            default:
                startGame();
                break;
        }
    }
}

function gameVersion1() {
    
}

function gameVersion2() {
    let i = Math.floor(Math.random() * options.length);//nao pode ter o mesmo index
    if (Exercise.some(element => element.decimal == grabAndDrops[i].decimal)) {
        return;
    }else{
        Exercise.push(options[i]);
        let div = document.createElement("div");
        div.id = i;
        div.className.add("password","input-group","justify-content-start");
        options[i].binario.forEach(element => {
            div.innerHTML += `<input value="${element}" maxlength="1" min="0" max="1" class="input" name="binary" type="number" disabled />`;
            document.querySelector(".gameBoard").innerHTML += div;
        });
        makeHelpLine();
    }
}

function makeHelpLine() {
    document.querySelector(".gameBoard").innerHTML =`
        <div class="password input-group justify-content-start helpBinary">
            <input maxlength="2" min="0" max="64" value="64" class="input help" name="binary" type="text" disabled/>
            <input maxlength="2" min="0" max="64" value="32" class="input help" name="binary" type="text" disabled/>
            <input maxlength="2" min="0" max="64" value="16" class="input help" name="binary" type="text" disabled/>
            <input maxlength="2" min="0" max="64" value="8" class="input help" name="binary" type="text" disabled/>
            <input maxlength="2" min="0" max="64" value="4" class="input help" name="binary" type="text" disabled/>
            <input maxlength="2" min="0" max="64" value="2" class="input help" name="binary" type="text" disabled/>
            <input maxlength="2" min="0" max="64" value="1" class="input help" name="binary" type="text" disabled/>
        </div> 
    `
}

function gameOver(e) {
    progress = 1;
    document.querySelector(".progress-bar").style.width = `1%`;
    for (let i = 1; i <= 4; i++) {
        document.querySelector(`.card${i}`).innerHTML = "X";
    }
    setTimeout(() => {
        modalGame.hide();
    }, 1000);
    setTimeout(() => {
        modalGame.show();
    }, 1500);
    Exercise=[];
}


let resetGame = ()=>{
    document.querySelector(".gameBoard").innerHTML =``
}


document.querySelector("#sala211Computer").addEventListener("click", ()=>{
    if (!checkGameCompleted("minigame3")) {
        modalIntro.show();
    } else {
        gameDone.show();
    }
})


document.querySelector("#miniGame4").addEventListener('shown.bs.modal', () => {
    startGame();

})

document.querySelector("#miniGame4").addEventListener('hidden.bs.modal', () => {
    resetGame();
});


document.querySelector(".closeGame").addEventListener("click",() =>{
    progress = 1;
    document.querySelector(".progress-bar").style.width = `${progress}%`;
    Exercise=[];
})