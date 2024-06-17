import * as invItems from "../models/inventoryModel.js";

let mouseX = 0;
let mouseY = 0;

//--------------------------------------------------------------------------------------------
// CONSTRUÇÃO DO INVENTARIO
let InventoryView = () =>{
    invItems.init();


    document.querySelector(".InventoryZone").innerHTML =`
    <div class="offcanvas offcanvas-bottom modal-background" tabindex="-1" id="inventory" aria-labelledby="inventoryTitle">
        <div class="offcanvas-header d-flex justify-content-between">
                <h5 class="offcanvas-title mx-1 " id="inventoryTitle">Inventory</h5>
                <h5 class="offcanvas-title mx-5 goto" data-bs-toggle="offcanvas" data-bs-target="#collectibles">Tropheus</h5>
                <button type="button" class="btn-close-white btn-close" id="Inventory-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class=" container-fluid text-center">
                <div class="inventory row row-cols-4 justify-content-center">
                    <div class="col inventorySlot rounded-1 mx-1 mt-3 mt-lg-1 p-0"></div>
                    <div class="col inventorySlot rounded-1 mx-1 mt-3 mt-lg-1 p-0"></div>
                    <div class="col inventorySlot rounded-1 mx-1 mt-3 mt-lg-1 p-0"></div>
                    <div class="col inventorySlot rounded-1 mx-1 mt-3 mt-lg-1 p-0"></div>
                    <div class="col inventorySlot rounded-1 mx-1 mt-3 mt-lg-1 p-0"></div>
                    <div class="col inventorySlot rounded-1 mx-1 mt-3 mt-lg-1 p-0"></div>
                    <div class="w-100 d-block d-xl-none"></div>
                    <div class="col inventorySlot rounded-1 mx-1 mt-3 mt-lg-1 p-0"></div>
                    <div class="col inventorySlot rounded-1 mx-1 mt-3 mt-lg-1 p-0"></div>
                    <div class="col inventorySlot rounded-1 mx-1 mt-3 mt-lg-1 p-0"></div>                        
                    <div class="col inventorySlot rounded-1 mx-1 mt-3 mt-lg-1 p-0"></div>
                    <div class="col inventorySlot rounded-1 mx-1 mt-3 mt-lg-1 p-0"></div>
                    <div class="col inventorySlot rounded-1 mx-1 mt-3 mt-lg-1 p-0"></div>
                </div>
            </div>
        </div>
    </div>`
    fillInventory();
}

// RESET DOS INVENTORY
let resetInventory = ()=>{
    let inventorySlot = document.querySelectorAll(".inventorySlot");
    for (const slot of inventorySlot) {
        slot.innerHTML = ""
    }    
}

function fillInventory() {
    let InventaryItems = invItems.getInventory();
    let inventorySlot = document.querySelectorAll(".inventorySlot");

    InventaryItems.forEach(item => {        
        let img = document.createElement('img');
        img.src = item.img;
        img.alt = item.name;
        img.id = item.name;
        img.className = 'img-fluid item';
        
        for (const slot of inventorySlot) {
            if (slot.innerHTML == "") {
                slot.appendChild(img);
                // remove addeventlistener do click para o inventory
                img.addEventListener("click", inventoryItemClick);
                return;
            }
        }
    })
}

function inventoryItemClick(event) {
    if (event.target.id == "lanterna") {
        document.querySelector('#Inventory-close').click();

        turnpower();
    }
   
}

function setItemZone(e) {
    e.preventDefault();
    invItems.AddToInventory(e.target.id);
    e.target.remove();
    resetInventory();
    fillInventory();
}

InventoryView();
//--------------------------------------------------------------------------------------------

// FUNÇÃO PARA COLOCAR OS ITEMS A SALA
export default function setItems(sala) {
    // Div para onde vais os items
    let itemZone = document.querySelector(".ItemZone");
    // Vai bucar os items desta sala
    let roomItems = invItems.getItemsRoom(sala);
    roomItems.forEach(element => {
        // criar item
        let img = document.createElement('img');
        img.src = element.img;
        img.alt = element.name;
        img.id = element.name;
        img.className = 'img-fluid item';
        // posiçao do item na tela
        img.style.position = 'absolute';
        img.style.top = element.y;
        img.style.left = element.x;
        // colocação do item na tela
        itemZone.appendChild(img);

        img.addEventListener("click",setItemZone)
    });
}

//--------------------------------------------------------------------------------------------
/// Lanterna
function turnpower() {
    let items = document.querySelectorAll(".ItemZone > .item");
    let Collectibles = document.querySelectorAll(".collectiblesZone > .collectible")
    if (flashlight.style.display === "none" || flashlight.style.display === "") {
        flashlight.style.display = "block";
        items.forEach(element => {
            element.style.display = "none";
        });
        Collectibles.forEach(element =>{
            element.style.display = "block";
        })
    }else{
        flashlight.style.display = "none";
        items.forEach(element => {
            element.style.display = "block";
        });
        Collectibles.forEach(element =>{
            element.style.display = "none";
        })
    }
}


function getMousePosition(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    

    flashlight.style.setProperty("--Xpos",mouseX+"px");
    flashlight.style.setProperty("--Ypos",mouseY+"px");
}

document.addEventListener("mousemove",getMousePosition);
document.addEventListener("touchmove",getMousePosition);
//--------------------------------------------------------------------------------------------

