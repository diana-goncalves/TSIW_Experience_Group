let inventory = [];
let items = [];

// CARREGAR ITEMS DA LOCALSTORAGE
export function init(){
    if (localStorage.items) {
        const tempItems = JSON.parse(localStorage.items);
        for (let item of tempItems) {
            items.push(new Item(item.x,item.y,item.name,item.img,item.room));
        }
    } else {
        items = [];
    }
    if (sessionStorage.inventory) {
        const tempInventory = JSON.parse(sessionStorage.inventory);
        for (let itemInv of tempInventory) {
            inventory.push(itemInv);
        }
    } else {
        inventory = [];
    }
}

// ADICIONAR ITEM
export function addItem(x,y,name,img,room){
    items.push(new Item(x,y,name,img,room));
    localStorage.setItem("items", JSON.stringify(items))
}

// ADICIONAR ITEM AO INVENTARIO
export function AddToInventory(item) {
    index = items.findIndex(element => element.name == item)
    inventory.push(items.splice(index,1))
    localStorage.setItem("items", JSON.stringify(items))
    sessionStorage.setItem("inventory", JSON.stringify(inventory))
}

// OBTER ITEMS DA ROOM
export function getItemsRoom(room) {
    let filterItems = items.filter(element => element.room.toLowerCase() == room.toLowerCase());
    return filterItems;
}

// OBTER ITEMS
export function getItems() {
    return items;
}

// OBTER INVENTORY
export function getInventory() {
    return inventory;
}

function getNextId() {
    return items.length > 0 ? items.length + 1 : 1;
}

/**
 *  CLASSE QUE MODELA OS ITEMS NO INVENTARIO
 */

class Item {
    id = null;
    x = null;
    y = null;
    name = "";
    img = "";
    room = "";

    constructor(x,y,name,img,room){
        this.id = getNextId();
        this.x = x;
        this.y = y;
        this.name = name;
        this.img = img;
        this.room = room;
    }
}