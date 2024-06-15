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