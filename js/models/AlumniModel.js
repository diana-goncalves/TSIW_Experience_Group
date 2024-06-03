let alumnis = [];

// CARREGAR TESTEMUNHOS DA LOCALSTORAGE
export function init() {
    if(localStorage.alumnis) {
        
        const tempTestemunhos = JSON.parse(localStorage.alumnis);
        for(let testemunho of tempTestemunhos) {
            alumnis.push(new Alumni(testemunho.name, testemunho.msgAlumni, testemunho.company, testemunho.awards, testemunho.occupation, testemunho.link, testemunho.photo, testemunho.state));
        }
    } else {
        alumnis = [];
    }
}

// ADICIONAR TESTEMUNHOS
export function addTestemunho(name, msgAlumni, company, awards, occupation, link, photo, state) {
    if (alumnis.some((element) => element.name.toLowerCase() === name.toLowerCase() && element.msgAlumni === msgAlumni)) {
        throw Error(`Testemunho já Existe!`);
    } else {
        alumnis.push(new Alumni(name, msgAlumni, company, awards, occupation, link, photo, state));
        localStorage.setItem("alumnis", JSON.stringify(alumnis));
    }
}

// REMOVER
export function removerTestemunho(name, msgAlumni) {
    alumnis = alumnis.filter((testemunho) => testemunho.name !== name && testemunho.msgAlumni !== msgAlumni);
    localStorage.setItem("alumnis", JSON.stringify(alumnis));
}

export function getAlumnis(filterName = "", isSorted = false) {
    // Criar nova array caso o admin queira procurar por um nome
    
    let filteredAlumnis = alumnis.filter((testemunho) => (testemunho.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === ""));
  
    filteredAlumnis = isSorted
      ? filteredAlumnis.sort((a, b) => a.name.localeCompare(b.name))
      : filteredAlumnis; 
    
    return filteredAlumnis;  
}

export function sortAlumnis(list) {
    
    let sortedAlumnis = list.sort((a, b) => a.name.localeCompare(b.name));
    
    return sortedAlumnis;
}

export function filtrarTestemunhoPorEstado(state) {
    return getAlumnis().filter(testemunho => testemunho.state === state);
}

export function editTestemunho(testemunhoName, newAlumniData) {
    // find index retorna -1 quando não encontra
    const testemunhoIndex = alumnis.findIndex(testemunho => testemunho.name === testemunhoName);

    if (testemunhoIndex !== -1) {
        
        try {
            
            removerTestemunho(testemunhoName);

            addTestemunho(newAlumniData.name, newAlumniData.msgAlumni, newAlumniData.company, newAlumniData.awards, newAlumniData.occupation, newAlumniData.link, newAlumniData.photo, newAlumniData.state);

        } catch (error) {
            throw error;
        } 
        
    } else {
        // Caso não encontre um testemunho com o mesmo nome na lista de testemunhos
        throw new Error("Alumni não encontrado!");
    }
}

export function getTestemunhoByName(testemunhoName) {
    return alumnis.find(testemunho => testemunho.name === testemunhoName);
}

/**
 *  Classe que modela os testemunhos
 */
class Alumni {
    name;
    msgAlumni;
    company;
    awards;
    occupation;
    link;
    photo;
    state;

    constructor(name, msgAlumni, company, awards, occupation, link, photo, state = "Oculto"){
        this.name = name;
        this.msgAlumni = msgAlumni;
        this.company = company;
        this.awards = awards;
        this.occupation = occupation;
        this.link = link;
        this.photo = photo;
        this.state = state;
    }
}

