let grabAndDrops = [
    {
        text: `Estudar <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> e <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> permite criar estruturas e estilos para páginas <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span>`,
        choices: ['CSS', 'Web', 'HTML', 'JavaScript','Matematica'],
        result: ['HTML','CSS','Web']
    },
    {
        text: `A Linguagem de programação <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> é conhecida por sua sintaxe simple e <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> em <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> diversas`,
        choices: ['JavaScript', 'Aplicações', 'Páginas', 'Python', 'Versatilidade'],
        result: ['Python','Versatilidade','Aplicações']
    },
    {
        text: `<span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> permite adicionar <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> e dinamismo aos <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> online`,
        choices: ['CSS', 'JavaScript', 'Projetos', 'Responsabiblidade', 'Iteratividade'],
        result: ['JavaScript','Iteratividade','Projetos']
    },
    {
        text: `A Tag <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> é usada para exibir <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> dentro de uma página <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span>`,
        choices: ['<img>', '<asset>', 'Imagens', 'HTML', 'CSS'],
        result: ['<img>','Imagens','HTML']
    },
    {
        text: `Utilize <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> e <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> para ajustar o  <span class="drop" ondrop="drop(event)" ondragover="allowDrop(event)"></span> entre elementos em uma página Web`,
        choices: ['margin', 'padding', 'border', 'espaçamento', 'font-size'],
        result: ['margin','padding','espaçamento']
    },
];

let Exercise;



let startGame = () =>{  
    let rep = [];
    let id = 0;
    for (let i = 1; i <= 3; i++) {
        const index = Math.floor(Math.random() * grabAndDrops.length);//nao pode ter o mesmo index
        if (rep.includes(index)) {
            i-=1;
        }else{
            rep.push(index);
            opt = grabAndDrops[index];
            //Make the Options 
            opt.choices.forEach(element => {
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
            line.innerHTML = opt.text;
            document.querySelector(`#exercise${i}`).appendChild(line);   
        }
    }        
}

let resetGame = ()=>{
    for (let i = 1; i <= 3; i++) {
        document.querySelector(`#options${i}`).innerHTML = "";
        document.querySelector(`#exercise${i}`).innerHTML = "";
    }
}

const minigameModal = document.getElementById('miniGame1');

minigameModal.addEventListener('shown.bs.modal', () => {
    startGame();

})

minigameModal.addEventListener('hidden.bs.modal', () => {
    // Aqui você pode executar alguma ação após a modal ser fechada
    console.log('A modal foi fechada.');
    // Por exemplo, limpar ou reiniciar algo após fechar a modal
    resetGame();
});


function allowDrop(e){
    e.preventDefault();
}

function drag(e){
    e.target.style.cursor = 'grab'
    e.dataTransfer.setData("Text",e.target.id);
    e.target.classList.remove("certo");
    e.target.classList.remove("errado");
}
function drop(e){
    e.preventDefault();
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
    } else if(data.slice(4,6)> 4  && data.slice(4,6) <= 9 ){
        father = `options2` 
    } else{
        father = `options3`
    }
    console.log("FATHER:"+father);
    if (father == e.target.id) {
        document.querySelector(`#${father}`).appendChild(elementDropped);
    }else{
        return;
    }

    
}
