import { addEvents } from "./models/EventModel.js";
import { addItem } from "./models/inventoryModel.js";
import { add } from "./models/UserModel.js";
import { addProject } from "./models/ProjectModel.js";
import { addCollectible } from "./models/collectiblesModel.js"
import { addTestemunho } from "./models/AlumniModel.js";

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

    if(!localStorage.alumnis) {
        const alumnis = [
            {
                name: "Nuno Sousa",
                msgAlumni: "Não posso deixar de referir que até ingressar na ESMAD não sabia nada de programação, nem de design. Pelo que, não retirando mérito ao meu esforço, tenho que referir que o excelente acompanhamento dos professores e a sua experiência, tanto ao nível do ensino, como ao nível profissional, foi sem dúvida o impulsionador disto tudo.",
                company: "Carbmee",
                awards: "Website Of The Day - NunoPS; UX/UI Design Award; Innovation Design Award; Awwwards Mobile Excellence",
                occupation: "Front-end developer",
                link: "https://www.linkedin.com/in/nunops/?original_referer=https%3A%2F%2Fnunops.com%2F",
                photo: "../media/alumnis/NunoSousa.png",
                state: "Publicado",
            },
            {
                name: "Nuno Costa",
                msgAlumni: "Os diferentes projetos de grupo e o foco nas tecnologias mais recentes proporcionaram-me uma base sólida de conhecimentos e habilidades práticas, como o trabalho de equipa e resolução de problemas.",
                company: "MOG Technologies",
                awards: "1º lugar no concurso internacional de programação Juezlti Contest of EU Code Week",
                occupation: "Full-Stack Developer",
                link: "https://pt.linkedin.com/in/nunof-castro",
                photo: "../media/alumnis/NUNO_COSTA 1.png",
                state: "Publicado",
            },
            {
                name: "Diogo Fernandes",
                msgAlumni: "“Comecei com o objetivo de seguir uma carreira em programação front-end, mas graças à vasta oferta que o curso nos dá, descobri tudo o que se passava para além do código. Com isto, descobri então o mundo de User Experience e nunca mais olhei para trás",
                company: "Blip",
                awards: null,
                occupation: "Product Designer",
                link: "https://www.linkedin.com/in/diogo-fernandes98/",
                photo: "../media/alumnis/DiogoFernandes.png",
                state: "Publicado",
            },
            {
                name: "Inês Sofia Reis",
                msgAlumni: "Inicialmente sem rumo, descobri a minha paixão: o Design da Experiência do Utilizador e de Interfaces, apenas no segundo ano. A licenciatura, elogiada por muitos conhecidos pelas suas competências abrangentes, proporcionou-me não apenas formação profissional, mas também experiências académicas que nunca vou esquecer",
                company: "Kendir Studios",
                awards: "Criadora de recursos educativos digitais premiados pela Direção-Geral de Educação",
                occupation: "UX Designer",
                link: "https://pt.linkedin.com/in/inesofiareis",
                photo: "../media/alumnis/InesReis.png",
                state: "Publicado",
            },
        ];
        alumnis.forEach((testemunho) => {
            addTestemunho(testemunho.name, testemunho.msgAlumni, testemunho.company, testemunho.awards, testemunho.occupation, testemunho.link, testemunho.photo, testemunho.state);
        });
    }




    
}
