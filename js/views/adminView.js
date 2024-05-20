import * as User from "../models/UserModel.js"

// Ajustar dinamicamente margem entre navbar e resto da página

const nav = document.querySelector("#navbarNav");

const alturaNav = nav.clientHeight;

const container = document.querySelector("#wrapperContainer");

container.style.marginTop = alturaNav + 'px';


// Mudar username

let estadoUser = User.getUserLogged();

document.querySelector(".headerAccount").innerHTML = `${estadoUser.username}`;

// document.querySelector("#menu_container").innerHTML += `<svg id="iconLogout" src="../../media/icons/Logout.svg"></svg>`