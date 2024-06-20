import * as gs from "../models/gameStateModel.js"

const historyLines = {
    "entrada": [
        "Olá?? Finalmente acordas-te! Estava a ver que não ias conseguir.",
        "Temos pouco tempo, por isso vamos direto ao assunto, ontem à noite, ocorreu um incidente.",
        "Algo... Inesperado aconteceu, perdi o controlo da situação e agora estás preso no 2º andar.",
        "Tenta procurar um saída no corredor."
    ],
    "hall 1":[
        "Bem, não temos acesso às escadas... e as portas estão trancadas, deve haver outra saida, continua pelo corredor!",
    ],
    "hall 2":[],
    "hall 3":[
        "Wow, isso não estava aí, mas parece ser a tua única opção de fuga.",
        "Tens aí uma chave, parece ser da sala 202, no início do corredor, talvez tenhas lá algum código para abrires o cofre."

    ],
    "sala 202":[
        "Boa! Procura o PC, deve estar no canto da sala."
    ],
    "sala 203":[
        "Deixaram esta sala aberta? Interessante, talvez tenha alguma pista útil."
    ],
    "sala 206":[],
    "sala 207":[],
    "sala 210":[],
    "sala 211":[],
    "parque":[
        "Parece que a queda é grande para te atirares, é melhor não."
    ],
    "minigame1":[
        "Boa, se bem me lembro, deve estar aí a minha lanterna, modifiquei-a para encontrar certos items, talvez te seja útil."
    ]
}

let makeToast = (line) => {//toast com as lines
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
    gs.init();//init
    if (!gs.checkVisitedRooms(room)  && historyLines[room] != [] ) {//confirma se é a primeira vez na sala e se tem falas
        const toastContainer = document.querySelector(".toast-container");
        let delay = 1000;

        historyLines[room].forEach(line => {//cria o toast
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