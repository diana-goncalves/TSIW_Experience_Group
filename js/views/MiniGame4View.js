import {init,addgamesCompleted,checkGameCompleted,getCodeByIndex} from "../models/gameStateModel.js"
let options
function fillOptions() {
    options = [
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
        },{
            binario: ["0","0","0","1","0","1","1"],
            decimal: `11`,
        },{
            binario: ["0","0","1","0","0","1","0"],
            decimal: `18`,
        },{
            binario: ["0","0","0","1","0","0","1"],
            decimal: `9`,
        }
    ];
    if (localStorage.minigame4) {
        const temp = JSON.parse(localStorage.minigame4);
        for (const ex of temp) {
            options.push(ex)
        }    
    }
}

fillOptions();
init();
let Exercise = [];
console.log(options);
let progress = 1;
let modalGame =  new bootstrap.Modal(document.querySelector("#miniGame4"));
let modalIntro =  new bootstrap.Modal(document.querySelector("#intro4"));
let gameDone =  new bootstrap.Modal(document.querySelector("#gameDone"));
let vitoria = new bootstrap.Modal(document.querySelector("#victoryModal"));


let startGame = () =>{  
    console.log("Progress no start game: "+ progress);
    for (let index = 1; index <= progress; index++) {
        let versao = Math.floor(Math.random() * 2);
        switch (versao) {
            case 0:
                index = gameVersion1(index);//leva o index caso sera repetido, retorna o index anterior
                break;
            case 1:
                index = gameVersion2(index);//leva o index caso sera repetido, retorna o index anterior
                break;
        }
    }
}


/**
 * VERSÃO EM QUE O JOGADOR TEM QUE SABER PARTES DA PARTE BINARIA DO NUMERO
 */
function gameVersion1(index) {
    let i = Math.floor(Math.random() * options.length);//nao pode ter o mesmo index
    if (Exercise.some(element => element.decimal == options[i].decimal)) {
        return index -= 1;
    }else{
        // faz o exercicio
        let line = document.createElement("div");
        line.id = i;// para saber o index do options
        line.classList.add("password","input-group","justify-content-start","binaryLine");// todas as classes que precisa
        options[i].binario.forEach(element => {
            let select = Math.floor(Math.random() * 2);//para ser aleatorio os inputs do user
            if (select == 1) {//mete o valor
                line.innerHTML += `<input value="${element}" maxlength="1" min="0" max="1" class="input rounded-1" name="binary" type="number" disabled />`;
            } else {// o utilizador é que tem que meter o valor
                line.innerHTML += `<input value="" maxlength="1" min="0" max="1" class="input" name="binary" type="number"/>`;
            }
        });
        //parte decimal
        line.innerHTML +=`
            <p class="m-3 text-white "> = </p>
            <input maxlength="3" value="${options[i].decimal}" min="0" max="128" class="input rounded-1 BinaryResult" name="binary" type="number" disabled />`;
        document.querySelector(".gameBoard").appendChild(line);
        //dicas
        makeHelpLine();
        return index;
    }
}

/**
 * VERSÃO EM QUE O JOGADOR TEM QUE SABER O DECIMAL DO NUMERO
 */
function gameVersion2(index) {
    let i = Math.floor(Math.random() * options.length);//nao pode ter o mesmo index
    if (Exercise.some(element => element.decimal == options[i].decimal)) {
        return index -= 1;
    }else{
        // faz o exercicio
        Exercise.push(options[i]);
        let line = document.createElement("div");
        line.id = i;
        line.classList.add("password","input-group","justify-content-start","binaryLine");// todas as classes que precisa
        options[i].binario.forEach(element => {
            line.innerHTML += `<input value="${element}" maxlength="1" min="0" max="1" class="input rounded-1" name="binary" type="number" disabled />`;
        });
        line.innerHTML +=`
            <p class="m-3 text-white "> = </p>
            <input maxlength="3" min="0" max="128" class="input rounded-1 BinaryResult" name="binary" type="number" />
        `
        document.querySelector(".gameBoard").appendChild(line);
        makeHelpLine();
        return index;
    }
}

function makeHelpLine() {
    document.querySelector(".gameBoard").innerHTML +=`
        <div class="password input-group justify-content-start helpBinary">
            <input maxlength="2" min="0" max="64" value="64" class="input help rounded-1" name="binary" type="text" disabled/>
            <input maxlength="2" min="0" max="64" value="32" class="input help rounded-1" name="binary" type="text" disabled/>
            <input maxlength="2" min="0" max="64" value="16" class="input help rounded-1" name="binary" type="text" disabled/>
            <input maxlength="2" min="0" max="64" value="8" class="input help rounded-1" name="binary" type="text" disabled/>
            <input maxlength="2" min="0" max="64" value="4" class="input help rounded-1" name="binary" type="text" disabled/>
            <input maxlength="2" min="0" max="64" value="2" class="input help rounded-1" name="binary" type="text" disabled/>
            <input maxlength="2" min="0" max="64" value="1" class="input help rounded-1" name="binary" type="text" disabled/>
        </div> 
        <hr>
    `
}

let resetGame = ()=>{
    document.querySelector(".gameBoard").innerHTML =``
}

document.querySelector(".CompleteLevel").addEventListener("click",(e)=>{
    let allCorrect = true;// var para confirmar se o exercicio está correcto

    let lines = document.querySelectorAll(".binaryLine");//vai buscar todos os exercicios *** Nivel 1 = 1 //Nivel 2 = 2 //Nivel 3 = 3 ***
    lines.forEach(element => {
        let index = element.id;
        options[index].binario.forEach((input,i) => {
            if (input == element.children[i].value) {
                element.children[i].classList.add("certo");
            }else{
                element.children[i].classList.add("errado");
                allCorrect = false;
            }
            element.children[i].addEventListener("change",()=>{
                element.children[i].classList.remove("certo");
                element.children[i].classList.remove("errado");
            })
        });
        if (options[index].decimal == element.lastElementChild.value) {
            element.lastElementChild.classList.add("Certo");
            
        }else{
            element.lastElementChild.classList.add("errado");
            allCorrect = false;
        }
        element.lastElementChild.addEventListener("change",()=>{
            element.lastElementChild.classList.remove("certo");
            element.lastElementChild.classList.remove("errado");
        })
    });
    if (allCorrect) {
        if (progress==3) {
            modalGame.hide();
            vitoria.show();
            addgamesCompleted("minigame4");
            
        }else{
            progress +=1;
            //Actualizar a progress-bar
            switch (progress) {
                case 1:
                    document.querySelector(".progress-bar").style.width = `0%`;
                    break;
                case 2:
                    document.querySelector(".progress-bar").style.width = `33%`;
                    break;
                case 3:
                    document.querySelector(".progress-bar").style.width = `66%`;
                    break;
            
                default:
                    document.querySelector(".progress-bar").style.width = `0%`;
                    break;
            }
            modalGame.hide();
            setTimeout(() => {
                modalGame.show();
            }, 500);
        }
    }
});


document.querySelector("#sala210Computer").addEventListener("click", ()=>{
    if (!checkGameCompleted("minigame4")) {
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


document.querySelector("#gameDone").addEventListener('shown.bs.modal', () => {
    let outputs = document.querySelectorAll(".gameDoneCode");
    let code = getCodeByIndex(2);
    outputs[2].value = code;
})

document.querySelector("#gameDone").addEventListener('hidden.bs.modal', () => {
    let outputs = document.querySelectorAll(".gameDoneCode");
    outputs[2].innerHTML = "";
});

document.querySelector("#victoryModal").addEventListener('shown.bs.modal', () => {
    let outputs = document.querySelectorAll(".vitoryCode");
    let code = getCodeByIndex(2);
    outputs[2].value = code;
})

document.querySelector("#victoryModal").addEventListener('hidden.bs.modal', () => {
    let outputs = document.querySelectorAll(".vitoryCode");
    outputs[2].innerHTML = "";
});

document.querySelector(".closeGame").addEventListener("click",() =>{
    progress = 1;
    document.querySelector(".progress-bar").style.width = `${progress}%`;
    Exercise=[];
})