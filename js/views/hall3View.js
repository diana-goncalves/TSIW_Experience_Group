import setItems from "../views/inventoryView.js";
import setCollectibles from "../views/collectiblesView.js";
import GameStateView from "./GameStateView.js";
import {checkItemInventory} from "../models/inventoryModel.js"
import { editUser, getUserLogged } from "../models/UserModel.js";
import {getCollectibles} from "../models/collectiblesModel.js";

// função para por as imagens responsivas
$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps();
});

let noKey =  new bootstrap.Modal(document.querySelector("#noKeyModal"));

// PORTA FINAL
let portaFinal = document.querySelector("#portaFinal");
function clickPortaFinal() {
    if (checkItemInventory("chaveTSIW")) {
        heroIMG.src = `../../media/img/ER-assets/hall3FIM.jpg`;

        document.querySelector(".imgLeft").src = "../../media/img/ER-assets/hall3FIM-toLeft.png"
        document.querySelector(".imgRight").src = "../../media/img/ER-assets/hall3FIM-toRight.png"
        document.querySelector(".imgBack").src = "../../media/img/ER-assets/hall3FIM-to-hall2.png"


        // remover event listener para conseguir colocar outro destinado a abrir o modal de vitoria
        portaFinal.removeEventListener("click", clickPortaFinal);

        portaFinal.addEventListener("click", makeVictoryMenu);

    } else {
        noKey.show();
    }
}

function hall3View() {
    GameStateView("hall 3");
    // Mete os items na sala
    setItems("hall 3");
    setCollectibles("hall 3")
    //--------------------------------------------------------------------
    // PORTA ESQUERDA
    const hall3LeftArea = document.querySelector("#hall3Left");
    const imgLeft = document.querySelector(".imgLeft");

    // PORTA DIREITA
    const hall3RightArea = document.querySelector("#hall3Right");
    const imgRight = document.querySelector(".imgRight");

    // CORREDOR ATRAS
    const hall3BackArea = document.querySelector("#hall3tohall2");
    const imgBack = document.querySelector(".imgBack");

    // COFRE
    const cofre = document.querySelector("#cofre");

    // IMAGEM PRINCIPAL HALL 3
    const heroIMG = document.querySelector("#heroHall3");

    // PARA APARECER O RELEVO NA PORTA ESQUERDA
    hall3LeftArea.addEventListener("mouseenter", (e)=> {
        e.preventDefault();
        imgLeft.style.display = "block";
    });

    hall3LeftArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgLeft.style.display = "none";
    });

    // PARA APARECER O RELEVO NA PORTA DIREITA
    hall3RightArea.addEventListener("mouseenter",(e)=>{
        e.preventDefault();
        imgRight.style.display="block";
    });

    hall3RightArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgRight.style.display="none";
    });

    // PARA APARECER O RELEVO NO CORREDOR EM BAIXO
    hall3BackArea.addEventListener("mouseenter",(e)=>{
        e.preventDefault();
        imgBack.style.display="block";
    });

    hall3BackArea.addEventListener("mouseleave",(e)=>{
        e.preventDefault();
        imgBack.style.display="none";
    });

    hall3LeftArea.addEventListener("click", (e)=>{
        if (checkItemInventory("chave 210")) {
            location.href="./Sala210.html"
        } else {
            noKey.show();
        }
    })

    hall3RightArea.addEventListener("click", (e)=>{
        if (checkItemInventory("chave 211")) {
            location.href="./Sala211.html"
        } else {
            noKey.show();
        }
    })

    portaFinal.addEventListener("click", clickPortaFinal)

    cofre.addEventListener("click", (e) => {
        e.preventDefault();
        cofreModal.show();
    })
}
hall3View();

//--------------------------------------------------------------------

// Cofre e código
let cofreModal = new bootstrap.Modal(document.querySelector("#cofreModal"));

let code1 = parseInt(document.querySelector("#code1").textContent);
document.querySelector("#code1UP").addEventListener("click", () => {
    code1===10 ? code1 : code1++;
    document.querySelector("#code1").textContent = `${code1}`;
})
document.querySelector("#code1DOWN").addEventListener("click", () => {
    code1===0 ? code1 : code1--;
    document.querySelector("#code1").textContent = `${code1}`;
})

let code2 = parseInt(document.querySelector("#code2").textContent);
document.querySelector("#code2UP").addEventListener("click", () => {
    code2===10 ? code2 : code2++;
    document.querySelector("#code2").textContent = `${code2}`;
})
document.querySelector("#code2DOWN").addEventListener("click", () => {
    code2===0 ? code2 : code2--;
    document.querySelector("#code2").textContent = `${code2}`;
})

let code3 = parseInt(document.querySelector("#code3").textContent);
document.querySelector("#code3UP").addEventListener("click", () => {
    code3===10 ? code3 : code3++;
    document.querySelector("#code3").textContent = `${code3}`;
})
document.querySelector("#code3DOWN").addEventListener("click", () => {
    code3===0 ? code3 : code3--;
    document.querySelector("#code3").textContent = `${code3}`;
})

let code4 = parseInt(document.querySelector("#code4").textContent);
document.querySelector("#code4UP").addEventListener("click", () => {
    code4===10 ? code4 : code4++;
    document.querySelector("#code4").textContent = `${code4}`;
})
document.querySelector("#code4DOWN").addEventListener("click", () => {
    code4===0 ? code4 : code4--;
    document.querySelector("#code4").textContent = `${code4}`;
})

const abrirCofre = document.querySelector("#abrirCofre");
const heroIMG = document.querySelector("#heroHall3");

// Clicar no botão para abrir cofre. Comparar codigo inserido com codigo na session storage.
abrirCofre.addEventListener("click", () => {
    const codigoInserido = `${code1}` + `${code2}` +`${code3}` + `${code4}`;
    const jogo = JSON.parse(sessionStorage.getItem("gameStatus"));
    const codigoJogo = `${jogo.code[0]}` + `${jogo.code[1]}` +`${jogo.code[2]}` + `${jogo.code[3]}`;

    if (codigoInserido === codigoJogo) {
        cofreModal.hide();
        //document.querySelector(".imgBack").src = "../../media/img/ER-assets/hall3CofreAberto-toHall2.png"
        heroIMG.src = "../../media/img/ER-assets/hall3CofreAberto.png";
        setItems("cofre");
    }
})

function makeVictoryMenu() {

    const tempoRestante = document.querySelector("#countdown").textContent;

    let collectibles = getCollectibles();
    const totalCollectibles = collectibles.length;
    let user = getUserLogged();
    const userCol = user.collectibles.length;

    document.querySelector("#bodyCofreModal").innerHTML =
    `
        <div class="container-fluid text-center">
            <div class="row">
                <h1
                    class="col align-content-center d-flex justify-content-center title text-capitalize text-xxl-start">
                    Conseguiste!</h1>
            </div>
            <div class="row mt-4">
                <p class="col text-white">Conseguiste completar todos os desafios, salvas-te todos os alunos da ESMAD!!! Será o fim? Será que consegues melhorar o teu tempo?</p>
            </div>
            <div class="row mt-4 justify-content-center">
                <img class="d-block w-25" src="../../media/img/ER-assets/trofeu.png" height="200" width="150" alt="Trofeu">
            </div>
            <div class="row mt-4">
                <div class="col">
                    <h5 class="text-white">Tempo: <span id="time-remaining">${tempoRestante}</span> Colecionáveis: <span>${userCol!=0 ? userCol : 0}/${totalCollectibles}</span></h5>
                </div>
                
                <div class="col"><button class="align-content-center btnGuardar" id="sairEscapeRoom">SAIR</button></div>

                <div class="col"><button class="align-content-center btnGuardar" id="CONTINUAR">CONTINUAR</button></div>

            </div>
        </div>
        
    `

    cofreModal.show();

    document.querySelector("#sairEscapeRoom").addEventListener("click", () => {

        // Guardar vitoria no user
        user.victory = true;
        let username = user.username;
        editUser(username, user);
        
        location.href="../account.html";

    })

    document.querySelector("#CONTINUAR").addEventListener("click", () => {

        cofreModal.hide();

    })

}