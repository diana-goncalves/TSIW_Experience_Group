import * as invItems from "./models/inventoryModel.js";



let items = document.querySelectorAll(".item");
let mouseX = 0;
let mouseY = 0;

let InventoryView = () =>{
    document.querySelector(".InventoryZone").innerHTML +=`
    <div class="offcanvas offcanvas-bottom modal-background" tabindex="-1" id="inventory" aria-labelledby="inventoryTitle">
        <div class="offcanvas-header d-flex justify-content-between">
                <h5 class="offcanvas-title mx-1 " id="inventoryTitle">Inventory</h5>
                <h5 class="offcanvas-title mx-5 goto" data-bs-toggle="offcanvas" data-bs-target="#collectibles">Tropheus</h5>
                <button type="button" class="btn-close-white btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
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
}


InventoryView();

items.forEach(item => {
    let inventorySlot = document.querySelectorAll(".inventorySlot");
    item.addEventListener("click",(e)=>{
        console.log("fdfsfd");
        e.preventDefault();
        for (const slot of inventorySlot) {
            if (slot.innerHTML == "") {
                slot.appendChild(item);

                item.addEventListener("click", inventoryItemClick)
                return
            }
        }
    })
});


function inventoryItemClick(event) {
    console.log( event.target.id.slice(0,3));
    if (event.target.id == "lanterna") {
        turnpower()
    }
    // Adicione aqui a lógica adicional que você deseja
}

function turnpower() {
    if (flashlight.style.display === "none" || flashlight.style.display === "") {
        flashlight.style.display = "block";
         hidden.style.setProperty("--hidden","black")

    }else{
        flashlight.style.display = "none";
        hidden.style.setProperty("--hidden","transparent")
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

