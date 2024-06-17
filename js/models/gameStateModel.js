 let gameState

export function init() {
    if(sessionStorage.gameStatus) {
        let temp = JSON.parse(sessionStorage.gameStatus);
        gameState = new GameStatus(temp.visitedRooms,temp.gamesCompleted, temp.code);
    } else {
        gameState = new GameStatus();
    }
}

export function addgamesCompleted(game){
    if (!gameState.gamesCompleted.includes(game)) {
        gameState.gamesCompleted.push(game);
        sessionStorage.setItem("gameStatus", JSON.stringify(gameState));
    }
}

export function addVisitedRooms(room) {
    if (!gameState.visitedRooms.includes(room)) {
        gameState.visitedRooms.push(room);
        sessionStorage.setItem("gameStatus", JSON.stringify(gameState));
    }    
}

export function checkVisitedRooms(room) {
    return gameState.visitedRooms.includes(room)  
}

export function checkGameCompleted(game) {
    return gameState.gamesCompleted.includes(game)  
}

export function NewGame() {
    gameState = new GameStatus();
    sessionStorage.setItem("gameStatus", JSON.stringify(gameState));
}

export function indexCode(n) {
    return gameState.code[n];
}

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