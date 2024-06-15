import {init,addgamesCompleted,checkGameCompleted} from "../models/gameStateModel.js"


let grabAndDrops = [
    {
        text: `Estudar <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> e <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> permite criar estruturas e estilos para páginas <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span>`,
        choices: ['CSS', 'web', 'HTML', 'JavaScript','matematica'],
        result: ['HTML','CSS','web']
    },
    {
        text: `A Linguagem de programação <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> é conhecida por sua sintaxe simple e <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> em <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> diversas`,
        choices: ['javaScript', 'aplicações', 'páginas', 'python', 'versatilidade'],
        result: ['python','versatilidade','aplicações']
    },
    {
        text: `<span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> permite adicionar <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> e dinamismo aos <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> online`,
        choices: ['CSS', 'JavaScript', 'projetos', 'responsabiblidade', 'iteratividade'],
        result: ['JavaScript','iteratividade','projetos']
    },
    {
        text: `A Tag <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> é usada para inserir <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> dentro de uma página <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span>`,
        choices: ['<img>', '<asset>', 'imagens', 'HTML', 'CSS'],
        result: ['<img>','imagens','HTML']
    },
    {
        text: `Utilize <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> e <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> para ajustar o  <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> entre elementos em uma página Web`,
        choices: ['margin', 'padding', 'border', 'espaçamento', 'font-size'],
        result: ['margin','padding','espaçamento']
    },
    {
        text: `<span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> define a <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> dos elementos na <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span>`,
        choices: ['CSS', 'padding', 'página', 'aparência', 'Font'],
        result: ['CSS','aparência','página']
    },
    {
        text: `A Tag <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> em <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> é usado para criar um <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span>`,
        choices: ['CSS', '<h1>', 'HTML', 'aparência', 'cabeçalho'],
        result: ['<h1>','HTML','cabeçalho']
    },
    {
        text: `A propiedade <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> em <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> é usada para definir a <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> do texto`,
        choices: ['CSS', 'color', 'HTML', 'cor', 'cabeçalho'],
        result: ['color','CSS','cor']
    },
];
let progress = 1;
let Exercise = [];
let modalGame =  new bootstrap.Modal(document.querySelector("#miniGame2"));
let modalIntro =  new bootstrap.Modal(document.querySelector("#intro2"));
let gameDone =  new bootstrap.Modal(document.querySelector("#gameDone"));
let vitoria = new bootstrap.Modal(document.querySelector("#victoryModal"));

let gameBoard = document.querySelector(".gameBoard");

let startGame = () =>{  
    let id = 0;
    makeBoard(progress);
    for (let i = 1; i <= progress; i++) {
        let index = Math.floor(Math.random() * grabAndDrops.length);//nao pode ter o mesmo index
        console.log(index);
        console.log(grabAndDrops[index]);
        console.log(Exercise);
        if (Exercise.some(element => element.text == grabAndDrops[index].text)) {
            i--;
        }else{
            Exercise.push(grabAndDrops[index]);

            //Make the Options 
            grabAndDrops[index].choices.forEach(element => {
                let span = document.createElement("span");
                span.draggable="true";
                span.ondragstart = drag ;
                span.textContent = element;
                span.id=`drag${id}`;
                span.classList.add("draggable");
                document.querySelector(`#options${i}`).appendChild(span);
                id+=1;
            });
            let line = document.createElement("p");
            line.classList.add("line");
            line.innerHTML = grabAndDrops[index].text;
            line.id = Exercise.length-1
            console.log(line);
            document.querySelector(`#exercise${i}`).appendChild(line);   
        }
    }        
}

let resetGame = ()=>{
    gameBoard.innerHTML = "";
}

function allowDrop(e){
    e.preventDefault();
}

function drag(e){
    e.target.style.cursor = 'grab';
    e.dataTransfer.setData("Text",e.target.id);
    e.target.classList.remove("certo");
    e.target.classList.remove("errado");
}
function drop(e){
    e.preventDefault();
    let CorrectLine = "";
    let data=e.dataTransfer.getData("Text");
    let elementDropped = document.querySelector(`#${data}`);
    let line= e.target.parentElement.parentElement.id;
    if (data.slice(4,6) <= 4) {
        CorrectLine = `exercise1`
     } else if(data.slice(4,6)> 4  && data.slice(4,6) <= 9 ){
        CorrectLine = `exercise2` 
     } else{
        CorrectLine = `exercise3`
     }
    // Move o elemento span para dentro do elemento div se tiver vazio
    if (e.target.innerHTML == "" && CorrectLine == line) {
        e.target.appendChild(elementDropped);
    } else {
        return;
    }
}
function dropSpan(e) {
    let data=e.dataTransfer.getData("Text");
    let elementDropped = document.querySelector(`#${data}`);
    let father;
    if (data.slice(4,6) <= 4) {
       father = `options1`
    } else if(data.slice(4,6)> 4 && data.slice(4,6) <= 9 ){
        father = `options2` 
    } else{
        father = `options3`
    }
    if (father == e.target.id) {
        document.querySelector(`#${father}`).appendChild(elementDropped);
    }else{
        return;
    }
}

document.querySelector(".CompleteLevel").addEventListener("click",(e)=>{
    e.preventDefault();
    let answers = [];
    let isAllCorrect = true;
    for (let i = 1; i <= progress; i++) {
        answers = document.querySelectorAll(`#exercise${i} .draggable`);
        if (answers.length<3) {
            alert("Tens que completar para puder seguir")
            return 0;
        } else {
            let line = document.querySelector(`#exercise${i} .line`).id;
            console.log(line);
            answers.forEach((element,index) => {
                if (element.textContent  == Exercise[line].result[index]) {
                    element.classList.add("certo");
                } else {
                    element.classList.add("errado");
                    isAllCorrect = false;
                }
            });
        }
    }
    if (answers != [] && isAllCorrect) {
        if (progress==3) {
            modalGame.hide();
            vitoria.show();
            addgamesCompleted("minigame1");
        } else {
            progress++;
            modalGame.hide();
            setTimeout(() => {
                modalGame.show();
            }, 500);
        }
    }
});

function makeBoard(rep) {
    for (let i = 1 ; i <= rep; i++) {
        gameBoard.innerHTML +=`
        <div class="row justify-content-around align-items-center mx-auto my-2 ">
            <div class="col-4 m-1 d-flex flex-wrap p-2 " id="options${i}" ondrop="dropSpan(event)" ondragover="allowDrop(event)"></div>
            <div class="col-6 mx-1 p-2" id="exercise${i}"></div>
        </div>
        <hr>
        `
    }
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
}


document.querySelector("#miniGame2").addEventListener('shown.bs.modal', () => {
    startGame();

})

document.querySelector("#miniGame2").addEventListener('hidden.bs.modal', () => {
    resetGame();
});


document.querySelector("#sala206Computer").addEventListener("click", ()=>{
    if (!checkGameCompleted("minigame2")) {
        modalIntro.show();
    } else {
        gameDone.show();
    }
})

document.querySelector(".closeGame").addEventListener("click",() =>{
    modalGame.hide();
    progress = 1;
    Exercise=[];
})




// Exposing functions to global scope
window.allowDrop = allowDrop;
window.drag = drag;
window.drop = drop;
window.dropSpan = dropSpan;