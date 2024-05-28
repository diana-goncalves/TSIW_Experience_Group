import * as collectibles from "../models/collectiblesModel.js";

//--------------------------------------------------------------------------------------------
// CONSTRUÇÃO DO INVENTARIO
let collectiblesView = () =>{
    collectibles.init();


    document.querySelector(".collectiblesZone").innerHTML =`
    <div class="offcanvas offcanvas-bottom modal-background" tabindex="-1" id="collectibles" aria-labelledby="CollectiblesTitle">
        <div class="offcanvas-header d-flex justify-content-between">
            <h5 class="offcanvas-title mx-1 goto"  data-bs-toggle="offcanvas" data-bs-target="#inventory">Inventory</h5>
            <h5 class="offcanvas-title mx-5 " id="CollectiblesTitle">Tropheus</h5>
            <button type="button" class="btn-close-white btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class=" container-fluid text-center">
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


function fillCollectibles() {
    let CollectedItems = collectibles.getCollectibles();
    console.log(CollectedItems);
    let collectibleSlot = document.querySelectorAll(".collectibleSlot");

    CollectedItems.forEach(item => {        
        let img = document.createElement('img');
        img.width = item.w;
        img.height = item.h;
        img.src = item.img;
        img.alt = item.name;
        img.id = item.name;
        img.className = 'img-fluid collectible';
        
        for (const slot of collectibleSlot) {
            if (slot.innerHTML == "") {
                slot.appendChild(img);
                // remove addeventlistener do click para o inventory
                img.addEventListener("click", inventoryItemClick);
                return;
            }
        }
    })
}

function setcollectibleZone(e) {
    e.preventDefault();
    collectibles.addCollectible(e.target.id)
    e.target.remove();
    resetCollectibles();
    fillCollectibles();
}


collectiblesView();