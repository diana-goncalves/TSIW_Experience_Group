import * as collectibles from "../models/collectiblesModel.js";
import { editUser } from "../models/UserModel.js";

//--------------------------------------------------------------------------------------------
// CONSTRUÇÃO DO INVENTARIO
let collectiblesView = () =>{
    collectibles.init();

    document.querySelector(".InvCollectibleZone").innerHTML =`
    <div class="offcanvas offcanvas-bottom modal-background" tabindex="-1" id="collectibles" aria-labelledby="CollectiblesTitle">
        <div class="offcanvas-header d-flex justify-content-between">
            <h5 class="offcanvas-title mx-1 goto"  data-bs-toggle="offcanvas" data-bs-target="#inventory">Inventory</h5>
            <h5 class="offcanvas-title mx-5" id="CollectiblesTitle">Tropheus</h5>
            <button type="button" class="btn-close-white btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="container-fluid text-center">
                <div class="Collectibles row row-cols-4 justify-content-center">
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>

                    <div class="w-100 d-block d-xl-none"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                    <div class="col collectibleSlot rounded-1 mx-1 mt-3 mt-lg-1"></div>
                </div>
            </div>
        </div>
    </div>`
    
    fillCollectibles();
}

// RESET DOS INVENTORY
let resetCollectibles = ()=>{
    let CollectibleSlot = document.querySelectorAll(".collectibleSlot");
    for (const slot of CollectibleSlot) {
        slot.innerHTML = ""
    }    
}

// Atualizar colecionaveis
let userCollectibles = [];

function fillCollectibles() {
    let CollectedItems = collectibles.getInventoryCollectibles();

    userCollectibles.push(CollectedItems);

    let collectibleSlot = document.querySelectorAll(".collectibleSlot");

    CollectedItems.forEach(item => {        
        let img = document.createElement('img');
        img.src = item.img;
        img.alt = item.name;
        img.id = item.name;
        img.className = 'img-fluid collectible';
        
        for (const slot of collectibleSlot) {
            if (slot.innerHTML == "") {
                slot.appendChild(img);
                return;
            }
        }
    })
}

function setcollectibleZone(e) {
    e.preventDefault();
    console.log(e.target.id);
    collectibles.AddToInventory(e.target.id)
    e.target.remove();
    resetCollectibles();
    fillCollectibles();
}

collectiblesView();

//--------------------------------------------------------------------------------------------

// FUNÇÃO PARA COLOCAR OS ITEMS A SALA
export default function setCollectibles(sala) {
    // Div para onde vais os items
    let CollZone = document.querySelector(".collectiblesZone");
    // Vai bucar os items desta sala
    let roomColletibles = collectibles.getCollectiblesRoom(sala);
    roomColletibles.forEach(element => {
        // criar item
        let img = document.createElement('img');
        img.width = element.w;
        img.height = element.h;
        img.src = element.img;
        img.alt = element.name;
        img.id = element.name;
        img.className = 'img-fluid collectible';
        // posiçao do item na tela
        img.style.position = 'absolute';
        img.style.top = element.y;
        img.style.left = element.x;
        // colocação do item na tela
        CollZone.appendChild(img);

        img.addEventListener("click",setcollectibleZone)
    });

}

//--------------------------------------------------------------------------------------------