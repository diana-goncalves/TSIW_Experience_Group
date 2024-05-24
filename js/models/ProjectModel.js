let projects = [];

// CARREGAR PROJETOS DA LOCALSTORAGE
export function init() {
    if(localStorage.projects) {
        const tempProjects = JSON.parse(localStorage.projects);
        for(let project of tempProjects) {
            projects.push(new Project(project.name, project.photo, project.link, project.author, project.msgProjects));
        }
    } else {
        projects = [];
    }
}

// ADICIONAR PROJETOS
export function addProject(name, photo, link, author, msgProjects) {
    if (projects.some((element) => element.name.toLowerCase() === name.toLowerCase() && element.author.toLowerCase() === author.toLowerCase())) {
        throw Error(`Projeto já Existe!`);
    } else {
        projects.push(new Project(name, photo, link, author, msgProjects));
        localStorage.setItem("projects", JSON.stringify(projects));
    }
}

// REMOVER
export function removeProjects(name, author) {
    projects = projects.filter((project) => project.name !== name && project.author !== author);
    localStorage.setItem("projects", JSON.stringify(projects));
  }

// DEFINIR/OBTER PROJECT ATUAR
// ORDENAR
//// caso seja necessario

// OBTER TODOS OS PROJETOS
export function getProjects() {
    return projects;
}

export function editProject(projectName, newProjectData) {
    // find index retorna -1 quando não encontra
    const projectIndex = projects.findIndex(project => project.name === projectName);

    if (projectIndex !== -1) {
        // Dar update das propriedades do projecto
        projects[projectIndex] = {...projects[projectIndex], ...newProjectData};

        // Dar update à local storage
        localStorage.setItem("projects", JSON.stringify(projects));

    } else {
        // Caso não encontre um projeto com o mesmo nome na lista de projetos
        throw new Error("Projeto não encontrado!");
    }
}

export function getProjectByName(projectName) {
    return projects.find(project => project.name === projectName);
}


export function postProjects() {

}
export function hideProjects() {
    
}


/**
 *  Classe que modela os Projetos
 */
class Project {
    name = "";
    photo = "";
    link = "";
    author = "";
    msgProjects = "";


    constructor(name, photo, link, author, msgProjects){
        this.name = name;
        this.photo = photo;
        this.link = link;
        this.author = author;
        this.msgProjects = msgProjects; 
    }
}

