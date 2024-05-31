import { addEvents } from "./models/EventModel.js";
import { addItem } from "./models/inventoryModel.js";
import { add } from "./models/UserModel.js";
import { addProject } from "./models/ProjectModel.js";
import { addCollectible } from "./models/collectiblesModel.js"

initdata();

function initdata() {
    //Items
    if (!localStorage.items) {
        const items = [
            {
                x: "60vw",
                y: "70vh",
                name: "lanterna",
                img: "../../media/img/ER-assets/Lanterna.png",
                room: "sala 202",
                inInventory: true
            },
            {
                x: "30vw",
                y: "70vh",
                name: "chave 202",
                img: "../../media/img/ER-assets/Chave 202.png",
                room: "sala 202",
                inInventory: false
            },
            {
                x: "45vw",
                y: "80vh",
                name: "chave 203",
                img: "../../media/img/ER-assets/Chave 203.png",
                room: "sala 202",
                inInventory: false
            },{
                x: "80vw",
                y: "15vh",
                name: "chave 206",
                img: "../../media/img/ER-assets/Chave 206.png",
                room: "sala 202",
                inInventory: false
            },
            {
                x: "10vw",
                y: "50vh",
                name: "chave 207",
                img: "../../media/img/ER-assets/Chave 207.png",
                room: "sala 202",
                inInventory: false
            },

        ];
        items.forEach(item => {
            addItem(item.x, item.y, item.name, item.img, item.room, item.inInventory);
        });
    }

    //Colletibles
    if (!localStorage.collectibles) {
        const collectibles = [
            {
                w:"2rem",
                h:"2rem",
                x: "60vw",
                y: "70vh",
                name: "bispo",
                img: "../../media/img/ER-assets/bispo.png",
                room: "sala 202",
                inInventory: false
            },
            {
                w:"1rem",
                h:"1rem",
                x: "2vw",
                y: "5vh",
                name: "Bola 8",
                img: "../../media/img/ER-assets/bola-8.png",
                room: "hall 1",
                inInventory: false
            },
            {
                w:"3rem",
                h:"3rem",
                x: "30vw",
                y: "55vh",
                name: "Cavalo",
                img: "../../media/img/ER-assets/cavalo.png",
                room: "hall 2",
                inInventory: false
            },
            {
                w:"1.5rem",
                h:"1.5rem",
                x: "35vw",
                y: "75vh",
                name: "Moedas",
                img: "../../media/img/ER-assets/coins.png",
                room: "hall 1",
                inInventory: false
            },
            {
                w:"2rem",
                h:"2rem",
                x: "75vw",
                y: "65vh",
                name: "controlo",
                img: "../../media/img/ER-assets/controlo.png",
                room: "sala 202",
                inInventory: false
            },

        ];
        collectibles.forEach(item => {
            addCollectible(item.w,item.h,item.x, item.y, item.name, item.img, item.room, item.inInventory);
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
            add(user.username, user.password);
        });
    }

    if(!localStorage.projects) {
        const projects = [
            {
                name: "Design Tokens",
                photo: "../media/projetos/Beatriz Rodrigues.jpg",
                link: null,
                author: "Beatriz Lopes",
                msgProjects: "Research on Design Tokens - Managing and Exporting",
                state: "Publicado"
            },
            {
                name: "CustoJusto Pro",
                photo: "../media/projetos/Maria Lima.jpg",
                link: null,
                author: "Maria Lima",
                msgProjects: "Revitalização do Front-end do CustoJusto",
                state: "Publicado"
            },
            {
                name: "Gestão de Portfólio de Projetos",
                photo: "../media/projetos/BrunoRodrigues.jpg",
                link: null,
                author: "Bruno Rodrigues",
                msgProjects: "Portfólio de Projetos da plataforma SCRAIM",
                state: "Publicado"
            }
        ];
        projects.forEach((project) => {
            addProject(project.name, project.photo, project.link, project.author, project.msgProjects, project.state)
        });
    }

    if(!localStorage.events) {
        const events = [
            {
                name: "ICPEC",
                msgEvent: "A 5.ª edição da International Computer Programming Education Conference vai realizar-se nos dias 27 e 28 de junho de 2024.",
                date: "2024-06-27",
                link: "https://www.esmad.ipp.pt/noticias/5th-icpec-%20international-computer-programming-education-conference",
                photo: null,
                state: "Destacado"
            },
            {
                name: "OPEN DAYS",
                msgEvent: "Queres vir conhecer a ESMAD? Nos dias 17 e 24 de abril, a ESMAD abre portas a todos os estudantes do Ensino Secundário e Profissional que nos queiram visitar!",
                date: "2024-04-17",
                link: "https://www.esmad.ipp.pt/noticias/open-days",
                photo: null,
                state: "Destacado"
            },
            {
                name: "MAD GAME JAM",
                msgEvent: "Se gostas de criar jogos, ou queres entrar nesta aventura, então agarra esta oportunidade.",
                date: "2024-02-23",
                link: "https://madjam.esmad.ipp.pt/",
                photo: null,
                state: "Destacado"
            },
            
        ];
        events.forEach((event) => {
            addEvents(event.name, event.msgEvent, event.date, event.link, event.photo, event.state)
        });
    }













}
