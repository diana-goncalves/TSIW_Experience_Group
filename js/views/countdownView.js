let countdown;
let time = 10;
let countdownTime = time * 60; // 30 minutos
let isPaused = false;
let havePause = false;

const countdownElement = document.querySelector("#countdown")

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
                             <button type="button" class="fullscreenButton buttonStart btn m-0 p-0" id="fullscreenBtn">
                                <span class="actual-text">&nbsp;Fullscreen&nbsp;</span>
                                <span aria-hidden="true" class="hover-text">&nbsp;Fullscreen&nbsp;</span>
                            </button> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

function makeGameOverMenu() {
    document.querySelector(".pauseZone").innerHTML +=`
        <div class="modal fade" id="gameOver" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="modalInicialLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xxl modal-fullscreen-md-down">
            <div class="modal-content modal-background">
                <div class="modal-body">
                    <div class="container-fluid text-center">
                        <div class="row">
                            <h1
                                class="col align-content-center d-flex justify-content-center title text-capitalize text-xxl-start">
                                Não Foi Desta!</h1>
                        </div>
                        <div class="row mt-4">
                            <p class="col text-white">Não Desistas, tiveste quase!</p>
                        </div>
                        <div class="row mt-4">
                            <div class="col">
                                <h5 class="text-white">Tempo: <span id="time-remaining">30:00</span></h5>
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="modal-footer border-black modal-background justify-content-center">
                    <button type="button" class="buttonStart btn m-0 p-0" onclick='location.href="./entrada.html"' >
                        <span class="actual-text">&nbsp;Try Again&nbsp;</span>
                        <span aria-hidden="true" class="hover-text">&nbsp;Try Again&nbsp;</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `
}

function makeVictoryMenu() {
    document.querySelector(".pauseZone").innerHTML +=`
        <div class="modal fade" id="gameOver" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="modalInicialLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xxl modal-fullscreen-md-down">
            <div class="modal-content modal-background">
                <div class="modal-body">
                    <div class="container-fluid text-center">
                        <div class="row">
                            <h1
                                class="col align-content-center d-flex justify-content-center title text-capitalize text-xxl-start">
                                Conseguiste!</h1>
                        </div>
                        <div class="row mt-4">
                            <p class="col text-white">Conseguiste completar todos os desafios, salvas-te todos os alunos da ESMAD!!!, mas será o fim? será que apanhas-te todos os colecionaveis? será que consegues melhorar o teu tempo?</p>
                        </div>
                        <div class="row mt-4">
                            <div class="col">
                                <h5 class="text-white">Tempo: <span id="time-remaining">30:00</span></h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-black modal-background justify-content-center">
                    <button type="button" class="buttonStart btn m-0 p-0" onclick='location.href="./entrada.html"' >
                        <span class="actual-text">&nbsp;Try Again&nbsp;</span>
                        <span aria-hidden="true" class="hover-text">&nbsp;Try Again&nbsp;</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `
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
                makeGameOverMenu();
                let gameOver = new bootstrap.Modal(document.querySelector("#gameOver"));
                gameOver.show();
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

// Manipulador de eventos para a tecla F
document.addEventListener('keydown', (e) => {
    if (e.key === 'f') {
        fullscreen();
    }
});

let fullscreenPointer = false;
function fullscreen() {

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
    
}

window.addEventListener('load', () => {
    updateCountdown();
    startCountdown();
    makePauseMenu();

    document.querySelector("#fullscreenBtn").addEventListener("click", () => {
        fullscreen();
    })

});

window.addEventListener("pagehide",()=>{
    saveCountdown();
})

