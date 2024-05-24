let alumnis = [];

// CARREGAR ALUMNI DA LOCALSTORAGE
export function init() {
    if(localStorage.alumnis) {
        const tempAlumnis = JSON.parse(localStorage.alumnis);
        for(let alumni of tempAlumnis) {
            alumnis.push(new Alumni(alumni.name, alumni.role, alumni.enterprise, alumni.photo, alumni.testimony, alumni.awards));
        }
    }else {
      alumnis = [];
    }
}

// ADICIONAR Alumni
export function addAlumni(name, role, enterprise, photo, testimony, awards) {
    if (alumnis.some((alumni) => alumni.name === name)) {
      throw Error(`Alumni "${name}" Ja existe!`);
    } else {
      alumnis.push(new Alumni(name, role, enterprise, photo, testimony, awards));
      localStorage.setItem("alumnis", JSON.stringify(bands));
    }
}

// REMOVER ALUMNI
export function removeAlumni(id) {
    alumnis = alumnis.filter((alumni) => alumni.id !== id);
    localStorage.setItem("alumnis", JSON.stringify(alumnis));
}

// DEFINIR A ALUMNI ATUAL (AQUELA QUE SERÁ VISTA NO DETALHE AO CLICKAR)
export function setCurrenTAlumni(id) {
    localStorage.setItem("alumni", id);
}
  
  // OBTER O ALUMNI ATUAL (TODO O OBJETO)
export function getCurrentAlumni() {
    return alumnis.find((alumni) => alumni.id == localStorage.getItem("alumni"));
}
  
export function getAlumnis() {
    return alumnis;
  }

function getNextId() {
    return alumnis.length > 0 ? alumnis.length + 1 : 1;
}

/**
 * Classe que modela os Alumni
 */
class Alumni{
    name = "";
    role = "";
    enterprise = "";
    photo = "";
    testimony = "";
    awards = "";
    id = null;

    constructor(name, role, enterprise, photo, testimony, awards){
        this.name = name;
        this.role = role;
        this.enterprise = enterprise;
        this.photo = photo;
        this.testimony = testimony;
        this.awards = awards;
        this.id = getNextId();

    }
}