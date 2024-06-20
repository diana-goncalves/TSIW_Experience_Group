let gameState

//INIT
export function init() {
    if(sessionStorage.gameStatus) {
        let temp = JSON.parse(sessionStorage.gameStatus);
        gameState = new GameStatus(temp.visitedRooms,temp.gamesCompleted, temp.code);
    } else {
        gameState = new GameStatus();
    }
}

//ADICIONA OS JOGOS COMPLETOS
export function addgamesCompleted(game){
    if (!gameState.gamesCompleted.includes(game)) {
        gameState.gamesCompleted.push(game);
        sessionStorage.setItem("gameStatus", JSON.stringify(gameState));
    }
}

//ADICIONA AS SALAS VISITADAS
export function addVisitedRooms(room) {
    if (!gameState.visitedRooms.includes(room)) {
        gameState.visitedRooms.push(room);
        sessionStorage.setItem("gameStatus", JSON.stringify(gameState));
    }    
}

//COMFIRMA SE JA VISITOU A ROOM
export function checkVisitedRooms(room) {
    return gameState.visitedRooms.includes(room)  
}

//COMFIRMA SE JA GANHOU O JOGO
export function checkGameCompleted(game) {
    return gameState.gamesCompleted.includes(game)  
}

//RESET PARA COMEÇAR O JOGO
export function NewGame() {
    gameState = new GameStatus();
    sessionStorage.setItem("gameStatus", JSON.stringify(gameState));
}

//DEVOLVE O NUMERO DO CODIGO POR INDEX
export function getCodeByIndex(n) {
    return gameState.code[n];
}

//FAZ UM CODIGO ALEATORIO
function getCode() {
    let code = []
    for (let i = 0; i < 4; i++) {
        code.push(Math.floor(Math.random() * 10))
    }
    return code
}

/**
 *  CLASSE QUE MODELA O STATUS DO GAME
 */

class GameStatus {
    visitedRooms= [];
    gamesCompleted = [];
    code = null;

    constructor(visitedRooms = [],gamesCompleted = [], code=getCode()){
        this.visitedRooms = visitedRooms;
        this.gamesCompleted = gamesCompleted;
        this.code = code;
    }
}