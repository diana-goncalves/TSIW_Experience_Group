let collectibles = [];

// CARREGAR ITEMS DA LOCALSTORAGE
export function init(){
    if (localStorage.collectibles) {
        const tempcollectibles = JSON.parse(localStorage.collectibles);
        for (let collectible of tempcollectibles) {
            collectibles.push(new Collectibles(collectible.w,collectible.h,collectible.x,collectible.y,collectible.name,collectible.img,collectible.room,collectible.inInventory));
        }
    } else {
        collectibles = [];
    }
}

// ADICIONAR ITEM
export function addCollectible(w,h,x,y,name,img,room,inInventory = false){
    collectibles.push(new Collectibles(w,h,x,y,name,img,room,inInventory));
    localStorage.setItem("collectibles", JSON.stringify(collectibles))
}

// ADICIONAR ITEM AO INVENTARIO
export function AddToInventory(item) {
    let index = collectibles.findIndex(element => element.name == item);
    collectibles[index].inInventory = true;
    localStorage.setItem("collectibles", JSON.stringify(collectibles));
}

// OBTER ITEMS DA ROOM
export function getCollectiblesRoom(room) {
    let filterItems = collectibles.filter(element => element.room.toLowerCase() == room.toLowerCase() && element.inInventory == false);
    return filterItems;
}

// OBTER ITEMS
export function getCollectibles() {
    return collectibles;
}

// OBTER INVENTORY
export function getInventoryCollectibles() {
    let filterCollectibles = collectibles.filter(element => element.inInventory == true)
    return filterCollectibles;
}

// RESET OS COLLECTIBLES
export function resetCollectibles() {
    collectibles.forEach(element => {
        element.inInventory = false;
    });
    localStorage.setItem("collectibles", JSON.stringify(collectibles));
}

/**
 *  CLASSE QUE MODELA OS ITEMS NO INVENTARIO
 */

class Collectibles {
    w = "";
    h = ""; 
    x = "";
    y = "";
    name = "";
    img = "";
    room = "";
    inInventory = false;

    constructor(w,h,x,y,name,img,room,inInventory){
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.name = name;
        this.img = img;
        this.room = room;
        this.inInventory = inInventory;
    }

    
}

