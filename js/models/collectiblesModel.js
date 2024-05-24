let collectibles = [];

// CARREGAR ITEMS DA LOCALSTORAGE
export function init(){
    if (localStorage.collectibles) {
        const tempcollectibles = JSON.parse(localStorage.collectibles);
        for (let collectible of tempcollectibles) {
            items.push(new Collectibles(collectible.w,collectible.h,collectible.x,collectible.y,collectible.name,collectible.img,collectible.room,collectible.inInventory));
        }
    } else {
        items = [];
    }
}

// ADICIONAR ITEM
export function addCollectible(x,y,name,img,room,inInventory = false){
    items.push(new Item(x,y,name,img,room,inInventory));
    localStorage.setItem("items", JSON.stringify(items))
}

// ADICIONAR ITEM AO INVENTARIO
export function AddToInventory(item) {
    let index = items.findIndex(element => element.name == item)
    items[index].inInventory = true;
    console.log(items);
    localStorage.setItem("items", JSON.stringify(items))
}

// OBTER ITEMS DA ROOM
export function getCollectiblesRoom(room) {
    let filterItems = items.filter(element => element.room.toLowerCase() == room.toLowerCase() && element.inInventory == false);
    return filterItems;
}

// OBTER ITEMS
export function getCollectibles() {
    return items;
}

// OBTER INVENTORY
export function getInventoryCollectibles() {
    let filterinventory = items.filter(element => element.inInventory === true)
    return filterinventory;
}

/**
 *  CLASSE QUE MODELA OS ITEMS NO INVENTARIO
 */

class Collectibles {
    w = null;
    h = null; 
    x = null;
    y = null;
    name = "";
    img = "";
    room = "";
    inInventory = false;

    constructor(x,y,name,img,room,inInventory){
        this.x = x;
        this.y = y;
        this.name = name;
        this.img = img;
        this.room = room;
        this.inInventory = inInventory;
    }

    
}

