import * as invItems from "./models/inventoryModel.js";
import * as User from "./models/UserModel.js";
import * as Project from "./models/ProjectModel.js";

initdata();

function initdata() {
    if (!localStorage.items) {
        const items = [
            {
                x: "60vw",
                y: "70vh",
                name: "lanterna",
                img: "../../media/img/ER-assets/Lanterna.png",
                room: "sala 201",
                inInventory: true
            },
            {
                x: "40vw",
                y: "50vh",
                name: "chave 202",
                img: "../../media/img/ER-assets/Chave.png",
                room: "sala 201",
                inInventory: false
            },
        ];
        items.forEach(item => {
            invItems.addItem(item.x, item.y, item.name, item.img, item.room, item.inInventory);
        });
    }

    // USERS
    if (!localStorage.users) {
        const users = [
            {
                id: 1,
                username: "admin",
                password: "admin"
            },
            {
                id: 2,
                username: "Auser",
                password: "Apass",
            },
            {
                id: 3,
                username: "user1",
                password: "pass1",
            },
            {
                id: 4,
                username: "user2",
                password: "pass2",
            },
            {
                id: 5,
                username: "Zuser",
                password: "Zpass",
            },
            {
                id: 6,
                username: "userB",
                password: "passB",
            }
        ];
        users.forEach((user) => {
            User.add(user.username, user.password);
        });
    }

    if(!localStorage.projects) {
        const projects = [
            {
                name: "Design Tokens",
                photo: "../media/projetos/Beatriz Rodrigues.jpeg",
                link: "nunca ouviu falar",
                author: "Beatriz Lopes",
                msgProjects: "Research on Design Tokens - Managing and Exporting"
            },
            {
                name: "CustoJusto Pro",
                photo: "../media/projetos/Maria Lima.jpg",
                link: "nunca ouviu falar",
                author: "Maria Lima",
                msgProjects: "Revitalização do Front-end do CustoJusto"
            },
            {
                name: "Gestão de Portfólio de Projetos",
                photo: "../media/projetos/BrunoRodrigues.jpg",
                link: "nunca ouviu falar",
                author: "Bruno Rodrigues",
                msgProjects: "Portfólio de Projetos da plataforma SCRAIM"
            }
        ];
        projects.forEach((project) => {
            Project.addProject(project.name, project.photo, project.link, project.author, project.msgProjects)
        });
    }















}
