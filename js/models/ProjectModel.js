let projects = [];

// CARREGAR PROJETOS DA LOCALSTORAGE
export function init() {
    if(localStorage.projects) {
        const tempProjects = JSON.parse(localStorage.projects);
        for(let project of tempProjects) {
            projects.push(new Project(project.name, project.photo, project.link, project.author, project.msgProjects, project.state));
        }
    } else {
        projects = [];
    }
}

// ADICIONAR PROJETOS
export function addProject(name, photo, link, author, msgProjects, state) {
    if (projects.some((element) => element.name.toLowerCase() === name.toLowerCase() && element.author.toLowerCase() === author.toLowerCase())) {
        throw Error(`Projeto já Existe!`);
    } else {
        projects.push(new Project(name, photo, link, author, msgProjects, state));
        localStorage.setItem("projects", JSON.stringify(projects));
    }
}

// REMOVER
export function removeProjects(name, author) {
    projects = projects.filter((project) => project.name !== name && project.author !== author);
    localStorage.setItem("projects", JSON.stringify(projects));
}

export function getProjects(filterName = "", isSorted = false) {
    // Criar nova array caso o admin queira procurar por um nome
    let filteredProjects = projects.filter((project) => (project.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === ""));
  
    filteredProjects = isSorted
      ? filteredProjects.sort((a, b) => a.name.localeCompare(b.name))
      : filteredProjects; 
  
    return filteredProjects;  
}

export function sortProjects(list) {
    
    let sortedProjects = list.sort((a, b) => a.name.localeCompare(b.name));

    return sortedProjects;
}

export function filtrarProjetosPorEstado(state) {
    return getProjects().filter(project => project.state === state);
}

export function editProject(projectName, newProjectData) {
    // find index retorna -1 quando não encontra
    const projectIndex = projects.findIndex(project => project.name === projectName);

    if (projectIndex !== -1) {
        
        try {
            
            removeProjects(projectName);

            addProject(newProjectData.name, newProjectData.photo, newProjectData.link, newProjectData.author, newProjectData.msgProjects);

        } catch (error) {
            throw error;
        } 
        
    } else {
        // Caso não encontre um projeto com o mesmo nome na lista de projetos
        throw new Error("Projeto não encontrado!");
    }
}

export function getProjectByName(projectName) {
    return projects.find(project => project.name === projectName);
}

/**
 *  Classe que modela os Projetos
 */
class Project {
    name;
    photo;
    link;
    author;
    msgProjects;
    state;

    constructor(name, photo, link, author, msgProjects, state = "Oculto"){
        this.name = name;
        this.photo = photo;
        this.link = link;
        this.author = author;
        this.msgProjects = msgProjects; 
        this.state = state;
    }
}

