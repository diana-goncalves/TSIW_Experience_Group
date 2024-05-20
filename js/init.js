import * as invItems from "./models/inventoryModel.js";
import * as User from "../models/UserModel";

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

    // USERS
    if (!localStorage.users) {
        const users = [
        {
            id: 1,
            username: "user1",
            password: "pass1",
        },
        {
            id: 2,
            username: "user2",
            password: "pass2",
        },
        ];
        users.forEach((user) => {
        User.add(user.username, user.password);
        });
    }

}