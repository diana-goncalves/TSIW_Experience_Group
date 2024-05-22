let items = [];

// CARREGAR ITEMS DA LOCALSTORAGE
export function init(){
    if (localStorage.items) {
        const tempItems = JSON.parse(localStorage.items);
        for (let item of tempItems) {
            items.push(new Item(item.x,item.y,item.name,item.img,item.room, item.inInventory));
        }
    } else {
        items = [];
    }
}

// ADICIONAR ITEM
export function addItem(x,y,name,img,room,inInventory = false){
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
export function getItemsRoom(room) {
    let filterItems = items.filter(element => element.room.toLowerCase() == room.toLowerCase() && element.inInventory == false);
    return filterItems;
}

// OBTER ITEMS
export function getItems() {
    return items;
}

// OBTER INVENTORY
export function getInventory() {
    let filterinventory = items.filter(element => element.inInventory === true)
    return filterinventory;
}

/**
 *  CLASSE QUE MODELA OS ITEMS NO INVENTARIO
 */

class Item {
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

