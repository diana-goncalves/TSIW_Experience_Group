let options = [
    {
        certo: `../../media/img/ER-assets/mini-game1/css1.png`,
        opt: [`../../media/img/ER-assets/mini-game1/css1.png`,`../../media/img/ER-assets/mini-game1/css2.png`,`../../media/img/ER-assets/mini-game1/css3.png`,`../../media/img/ER-assets/mini-game1/css4.png`]
    },
    {
        certo: `../../media/img/ER-assets/mini-game1/html1.png`,
        opt: [`../../media/img/ER-assets/mini-game1/html1.png`,`../../media/img/ER-assets/mini-game1/html2.png`,`../../media/img/ER-assets/mini-game1/html3.png`,`../../media/img/ER-assets/mini-game1/html4.png`]
    },
    {
        certo: `../../media/img/ER-assets/mini-game1/vscode1.png`,
        opt: [`../../media/img/ER-assets/mini-game1/vscode1.png`,`../../media/img/ER-assets/mini-game1/vscode2.png`,`../../media/img/ER-assets/mini-game1/vscode3.png`,`../../media/img/ER-assets/mini-game1/vscode4.png`]
    },
];

let Exercise = [];
let progress = 0
let modalGame =  new bootstrap.Modal(document.querySelector("#miniGame2"))


let startGame = () =>{  
    let index = Math.floor(Math.random() * options.length);//nao pode ter o mesmo index
    console.log(index);
    if (Exercise.some(element => element.certo == options[index].certo)) {
        startGame();
    }else{
        Exercise.push(options[index]); 
        options[index].opt.forEach((element,i) => {
            let img = document.createElement("img");
            img.classList.add("w-50", "h-50", "logo");
            img.src = element;
            if (element == options[index].certo) {
                
            }else{

            }
            document.querySelector(`.card${i+1}`).appendChild(img)
        });
    }
}

let resetGame = ()=>{
    for (let i = 1; i <= 4; i++) {
        document.querySelector(`.card${i}`).innerHTML = "";
    }
    Exercise = [];
}

document.querySelector("#miniGame2").addEventListener('shown.bs.modal', () => {
    startGame();

})

document.querySelector("#miniGame2").addEventListener('hidden.bs.modal', () => {
    resetGame();
});
