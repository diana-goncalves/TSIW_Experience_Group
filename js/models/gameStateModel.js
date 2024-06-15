 let gameState

export function init() {
    console.log("tenso");
    if(sessionStorage.gameStatus) {
        let temp = JSON.parse(sessionStorage.gameStatus);
        console.log("temp:");
        console.log(temp);
        gameState = new GameStatus(temp.visitedRooms,temp.gamesCompleted);
    } else {
        gameState = new GameStatus();
    }
    console.log(gameState);
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

/**
 *  CLASSE QUE MODELA O STATUS DO GAME
 */

class GameStatus {
    visitedRooms= [];
    gamesCompleted = [];

    constructor(visitedRooms = [],gamesCompleted = []){
        this.visitedRooms = visitedRooms;
        this.gamesCompleted = gamesCompleted;
    }
}