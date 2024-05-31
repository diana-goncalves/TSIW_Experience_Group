import * as gs from "../models/gameStateModel.js"

const historyLines = {
    "entrada": [
        "Boas, ja chegaste? Ótimo, obrigado por responderes ao meu pedido",
        "Foste o único que pode vir aqui a um domingo, seja como for mãos à obra",
        "O sistema está cheio de erros, preciso então que vás aos computadores para me dares acesso remoto",
        "Assim poderei fazer um reboot ao sistema para amanhã os nossos alunos não terem problemas. Boa sorte!"
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
    if (!gs.checkVisitedRooms(room)) {
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

