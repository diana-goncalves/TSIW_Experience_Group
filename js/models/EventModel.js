let events = [];

// CARREGAR EVENTOS DA LOCALSTORAGE
export function init() {
    if(localStorage.events) {
        const tempEvents = JSON.parse(localStorage.events);
        for(let event of tempEvents) {
            events.push(new Event(event.name, event.msgEvent, event.date, event.link, event.photo, event.state));
        }
    } else {
        events = [];
    }
}

// ADICIONAR EVENTOS
export function addEvents(name, msgEvent, date, link, photo, state) {
    if (events.some((element) => element.name.toLowerCase() === name.toLowerCase() && element.date === date)) {
        throw Error(`Projeto já Existe!`);
    } else {
        events.push(new Event(name, msgEvent, date, link, photo, state));
        localStorage.setItem("events", JSON.stringify(events));
    }
}

// REMOVER
export function removeEvents(name, date) {
    events = events.filter((event) => event.name !== name && event.date !== date);
    localStorage.setItem("events", JSON.stringify(events));
}

export function getEvents(filterName = "", isSorted = false) {
    // Criar nova array caso o admin queira procurar por um nome
    let filteredEvents = events.filter((event) => (event.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === ""));
  
    filteredEvents = isSorted
      ? filteredEvents.sort((a, b) => a.name.localeCompare(b.name))
      : filteredEvents; 
  
    return filteredEvents;  
}

export function sortEvents(list) {
    
    let sortedEvents = list.sort((a, b) => a.name.localeCompare(b.name));

    return sortedEvents;
}

export function filtrarEventoPorEstado(state) {
    return getEvents().filter(event => event.state === state);
}

export function editEvent(eventName, newEventData) {
    // find index retorna -1 quando não encontra
    const eventIndex = events.findIndex(event => event.name === eventName);

    if (eventIndex !== -1) {
        
        try {
            
            removeEvents(eventName);

            addEvents(newEventData.name, newEventData.msgEvent, newEventData.date, newEventData.link, newEventData.photo);

        } catch (error) {
            throw error;
        } 
        
    } else {
        // Caso não encontre um projeto com o mesmo nome na lista de projetos
        throw new Error("Evento não encontrado!");
    }
}

export function getEventByName(eventName) {
    return events.find(event => event.name === eventName);
}

/**
 *  Classe que modela os eventos
 */
class Event {
    name;
    msgEvent;
    date;
    link;
    photo;
    state;

    constructor(name, msgEvent, date, link, photo, state = "Oculto"){
        this.name = name;
        this.msgEvent = msgEvent;
        this.date = date;
        this.link = link;
        this.photo = photo;
        this.state = state;
    }
}

