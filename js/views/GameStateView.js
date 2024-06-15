import * as gs from "../models/gameStateModel.js"

const historyLines = {
    "entrada": [
        "Ja chegaste? Ótimo, obrigado por responderes ao meu pedido",
        "Foste o único que pôde vir aqui a um domingo, seja como for, mãos à obra",
        "O sistema está cheio de erros, preciso então que vás aos computadores para me dares acesso remoto",
        "Assim, poderei reiniciar o sistema para amanhã os nossos alunos não terem problemas. Boa sorte!"
    ],
    "hall 1":[
        "Boa, agora é que começa a sério! Como é domingo a maior parte das salas devem estar fechadas",
        "Se não me engano mais para o fundo do corredor, deves encontrar umas chaves no chão",
        "Deixei-as cair ontem quando estava a fazer a revisão, por favor não digas nada à gerência"
    ],
    "hall 2":[],
    "hall 3":[],
    "sala 202":[
        "Boa! entraste, procura o pc, ele deve tar no canto da sala"
    ],
    "sala 203":[],
    "sala 206":[],
    "sala 207":[],
    "sala 210":[],
    "sala 211":[],
    "parque":[
        "Esse é o parque exterior, provavelmente deixaste aí o carro. Como és novo deixo a informação, para além desse espaço todo ainda existe um parque interior para funcionários e estudantes",
        "Com tanto espaço é impossivel ficar sem lugar 😂"
    ]
}


let countdown;
let time = 30;
let countdownTime = time * 60; // 30 minutos
let isPaused = false;
let havePause = false;

const countdownElement = document.querySelector("#countdown")

let makeToast = (line) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = `
    <div class="toast modal-background" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="15000">
        <div class="toast-header modal-background">
            <img src="../../media/img/ER-assets/supervisor.png" class="rounded me-2" height="48px" width="48px" alt="Chefe">
            <strong class="me-auto">Chefe</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body modal-background">
            ${line}
        </div>
    </div>
    `;
    return tempDiv.firstElementChild;
}

function makePauseMenu() {
        document.querySelector(".pauseZone").innerHTML = `
        <div class="modal fade"  id="pauseModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xxl modal-fullscreen-md-down">
                <div class="modal-content modal-background">
                    <div class="modal-content modal-background">
                        <div class=" modal-body">
                            <div class="row modal-body text-center justify-content-center d-flex flex-column mx-auto p-0">
                                <h1 class="col mt-3 align-content-center title text-capitalize">PAUSA</h1>    
                            </div>
                            <div class="modal-footer border-black modal-background d-flex justify-content-center">
                                <button type="button" class="resumeButton buttonStart btn m-0 p-0">
                                    <span class="actual-text">&nbsp;Resume&nbsp;</span>
                                    <span aria-hidden="true" class="hover-text">&nbsp;Resume&nbsp;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
}

export default function GameStateView(room) {
    gs.init();
    makePauseMenu();
    if (!gs.checkVisitedRooms(room)  && historyLines[room] != [] ) {
        const toastContainer = document.querySelector(".toast-container");
        let delay = 1000;

        historyLines[room].forEach(line => {
            let toastElement = makeToast(line);
            toastContainer.appendChild(toastElement);
            const toast = new bootstrap.Toast(toastElement);


            setTimeout(() => {
                toast.show();
            }, delay);

            delay += 2000;
        });
    }

    gs.addVisitedRooms(room);
}


function updateCountdown() {
    if (sessionStorage.countdown) {
        countdownTime = parseInt(sessionStorage.countdown);
    }
    updateDisplay();
}

function updateDisplay() {
    let minutes = Math.floor(countdownTime / 60);
    let seconds = countdownTime %60;
    seconds = seconds <10 ? "0"+ seconds : seconds;
    countdownElement.textContent=`${minutes}:${seconds}`;            
}

function startCountdown() {
    countdown = setInterval(() => {
        if (!isPaused) {
            if (countdownTime <= 0) {
                clearInterval(countdown);
                alert('Time is up!');
            } else {
                updateDisplay();
                countdownTime--;
            }
        }
    }, 1000);
}

// Manipulador de eventos para a tecla ESC
document.addEventListener('keydown', (e) => {
    let pause =  new bootstrap.Modal(document.querySelector("#pauseModal"));

    if (e.key === 'Escape' || e.key === 'Esc') {
        isPaused = !isPaused; //actualiza a variavel
        console.log(isPaused);
        if (isPaused) {
            pause.show();
            document.querySelector(".resumeButton").addEventListener("click",(e)=>{
                e.preventDefault();
                pause.hide();
                isPaused = false;
            })
        }
        else{
            console.log("dsdsadsadsasadsasadsadsaaaaa");
            pause.hide();
        }
    }
});

function saveCountdown() {
    sessionStorage.setItem("countdown",countdownTime)
}

window.addEventListener('load', () => {
    updateCountdown();
    startCountdown();
});

window.addEventListener("pagehide",()=>{
    saveCountdown();
})