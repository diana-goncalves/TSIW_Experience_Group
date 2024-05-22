import { getUserLogged,logout } from "../models/UserModel.js";

// Ajustar dinamicamente margem entre navbar e resto da página

const nav = document.querySelector("#navbarNav");

const alturaNav = nav.clientHeight;

const container = document.querySelector("body");

container.style.marginTop = alturaNav + 'px'; // Para aumentar distancia adicionar por exemplo: (alturaNav + 64 + 'px') -> para adicionar 64px

// ERRO PARA RESOLVER: RETIRAR ICON PARA FAZER LOGIN DA NAVBAR NA PÁGINA DE PERFIL E ADMIN

document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o elemento com a classe 'navbar-toggler'
    var navbarToggler = document.querySelector(".navbar-toggler");

    // Seleciona o elemento com a classe 'navbar-collapse'
    var navbarMenu = document.querySelector(".navbar-collapse");

    let navPAI = document.querySelector(".navbar");
    
    
    let estadoUser = getUserLogged();

    // Mudar navbar caso user ou admin estiverem logados  
    
    if (estadoUser) {
        // admin
        if (estadoUser.id === 1) {
        
            document.querySelector(".user_icon").href = "../../html/admin.html"
            document.querySelector(".user_icon").innerHTML = ` ${estadoUser.username}`
            document.querySelector("#LoginLogout_Container").innerHTML += 
            `
            <li class="nav-item">
                <button class="logoutButton" id="logoutIndex"><i class="fas fa-sign-out" style="color: var(--color-yellow);"></i></button>    
            </li>
            
            `
            
        } 
        // user
        else {
    
            document.querySelector(".user_icon").href = "../../html/account.html"
            document.querySelector(".user_icon").innerHTML = ` ${estadoUser.username}`
            document.querySelector("#LoginLogout_Container").innerHTML += 
            `
            <li class="nav-item">
                <button class="logoutButton" id="logoutIndex"><i class="fas fa-sign-out" style="color: var(--color-yellow);"></i></button>    
            </li>
            
            `
        }

        // logout

        document.querySelector("#logoutIndex").addEventListener("click", event => {
            event.preventDefault()

            
            if (confirm("Queres mesmo terminar sessão?")) {
                
                logout()

                location.href = "../../index.html";
            
            }
        })

    }

    // Adiciona um evento de clique ao elemento 'navbarToggler'
    navbarToggler.addEventListener("click", function() {
        // Verifica se a classe 'show' está presente no elemento 'navbarMenu'
        if (navbarMenu.classList.contains("show")) {
            // Se estiver presente, remove a classe 'show' do elemento 'navbarMenu'
            navbarMenu.classList.remove("show");
            // Mudar para a altura máxima regular
            navPAI.style.maxHeight = '60px';
            
        } else {
            // Se não estiver presente, adiciona a classe 'show' ao elemento 'navbarMenu'
            navbarMenu.classList.add("show");
            // Mudar a altura máxima para conter todo o conteudo
            navPAI.style.maxHeight = '300px';

        }
    });
});



