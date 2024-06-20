import * as gs from "../models/gameStateModel.js"

const historyLines = {
    "entrada": [
        "Ola?? Finalmente acordas-te! Estava a ver que não ias conseguir",
        "Temos pouco tempo, por isso vamos direto ao assunto, otem á noite, houve um incidente.",
        "Algo... Inesperado acondeteu, as coisas saíram do controlo e agora estás preso no segundo andar",
        "Tenta procurar um saída no corredor"
    ],
    "hall 1":[
        "Bem, não temos acesso ás escadas... e as portas estão trancada, deve a ver outra saida, continua pelo corredor",
    ],
    "hall 2":[],
    "hall 3":[
        "Wow, isso nao estava aí, mas parece ser a tua unica opção de fuga",
        "tens aí uma chave, parece ser da sala 202, no inicio do corredor, talvez tenhas lá qualquer coisa para descobrir o codigo"

    ],
    "sala 202":[
        "Boa! entraste, talvez no pc. Procura por ele, deve tar no canto da sala"
    ],
    "sala 203":[
        "Deixaram esta sala aberta? Interesante, talve tenha alguma coisa de util"
    ],
    "sala 206":[],
    "sala 207":[],
    "sala 210":[],
    "sala 211":[],
    "parque":[
        "Parece que a queda é grande para te atirares, é melhor não"
    ],
    "minigame1":[
        "Boa, lembrando bem, deve estar aí a minha lanterna, modifiquei-a para encontrar certos items, talvez te seja ser util"
    ]
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

            delay += 2000;
        });
    }

    gs.addVisitedRooms(room);
}