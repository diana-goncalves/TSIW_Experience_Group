let projects = [];

// CARREGAR PROJETOS DA LOCALSTORAGE
export function init() {
    if(localStorage.projects) {
        const tempProjects = JSON.parse(localStorage.projects);
        for(let project of tempProjects) {
            projects.push(new Project(project.name, project.photo, project.link, project.author));
        }
    } else {
        projects = [];
    }
}

// ADICIONAR PROJETOS
export function addProject(name, photo, link, author) {
    if (projects.some((element) => element.name.toLowerCase() === name.toLowerCase() && element.author.toLowerCase() === author.toLowerCase())) {
        throw Error(`Projeto já Existe!`);
    } else {
        projects.push(new Project(name, photo, link, author));
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

/**
 *  Classe que modela os Projetos
 */
class Project {
    name = "";
    photo = "";
    link = "";
    author = "";

    constructor(name, photo, author){
        this.name = name;
        this.photo = photo;
        this.link = link;
        this.author = author;
    }
}

