import { getUserLogged } from "../models/UserModel.js";

// ERRO PARA RESOLVER: RETIRAR ICON PARA FAZER LOGIN DA NAVBAR NA PÁGINA DE PERFIL E ADMIN


document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o elemento com a classe 'navbar-toggler'
    var navbarToggler = document.querySelector(".navbar-toggler");

    // Seleciona o elemento com a classe 'navbar-collapse'
    var navbarMenu = document.querySelector(".navbar-collapse");

    let navPAI = document.querySelector(".navbar");
    
    
    let estadoUser = getUserLogged();

    // Mudar navbar caso user ou admin estiverem logados  <i class="fas fa-sign-out"></i>
    
    if (estadoUser) {
        // admin
        if (estadoUser.id === 1) {
        
            // document.querySelector(".navbar-nav").innerHTML += `<li class="nav-item">
            // <a class="nav-link admin_page" href="./html/admin.html">ADMIN</a></li>`
            document.querySelector(".user_icon").href = "../../html/admin.html"
            document.querySelector(".user_icon").innerHTML = ` ${estadoUser.username}`
        } 
        // user
        else {
    
            // document.querySelector(".navbar-nav").innerHTML += `<li class="nav-item">
            // <a class="nav-link" href="./html/account.html">${estadoUser.username}</a></li>`
            document.querySelector(".user_icon").href = "../../html/account.html"
            document.querySelector(".user_icon").innerHTML = ` ${estadoUser.username}`
            
        }
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
