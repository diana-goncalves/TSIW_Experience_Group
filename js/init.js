import * as invItems from "./models/inventoryModel.js";


initdata();

function initdata(){
    if (!localStorage.items) {
        const items = [
            {
                x: "6rem",
                y: "5.5rem",
                name: "lanterna",
                img: "../../media/img/ER-assets/Lanterna.png",
                room: "sala 201"
            },
            {
                x: "8rem",
                y: "8.5rem",
                name: "chave 202",
                img: "../../media/img/ER-assets/Chave.png",
                room: "sala 201"
            },
        ];
        items.forEach(item =>{
            invItems.addItem(item.x,item.y,item.name,item.img,item.room)
        })
    }
}