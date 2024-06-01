import * as gs from "../models/gameStateModel.js"

let countdown;
let time = 30;
let countdownTime = time * 60; // 30 minutos

const countdownElement = document.querySelector("#countdown")

const historyLines = {
    "entrada": [
        "Boas, ja chegaste? Ótimo, obrigado por responderes ao meu pedido",
        "Foste o único que pode vir aqui a um domingo, seja como for mãos à obra",
        "O sistema está cheio de erros, preciso então que vás aos computadores para me dares acesso remoto",
        "Assim poderei fazer um reboot ao sistema para amanhã os nossos alunos não terem problemas. Boa sorte!"
    ],
    "hall 1":[],
    "hall 2":[],
    "hall 3":[],
    "sala 202":[],
    "sala 203":[],
    "sala 206":[],
    "sala 207":[],
    "sala 210":[],
    "sala 211":[],
}

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

export default function GameStateView(room) {
    gs.init();
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

            delay += 3000;
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
        if (countdownTime <= 0) {
            clearInterval(countdown);
            alert('Time is up!');
        } else {
            updateDisplay();
            countdownTime--;
        }
    }, 1000);
}

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