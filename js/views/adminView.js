// Ajustar dinamicamente margem entre navbar e resto da página

const nav = document.querySelector("#navbarNav");

const alturaNav = nav.clientHeight;

const container = document.querySelector("#wrapperContainer");

container.style.marginTop = alturaNav + 'px';
