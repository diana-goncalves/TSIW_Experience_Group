let countdown;
let time = 30;
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
                        </div>
                    </div>
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
    makePauseMenu();
});

window.addEventListener("pagehide",()=>{
    saveCountdown();
})

