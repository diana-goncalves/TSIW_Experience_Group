import * as User from "../models/UserModel.js";

document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o elemento com a classe 'navbar-toggler'
    var navbarToggler = document.querySelector(".navbar-toggler");

    // Seleciona o elemento com a classe 'navbar-collapse'
    var navbarMenu = document.querySelector(".navbar-collapse");

    let navPAI = document.querySelector(".navbar");
    
    
    let estadoUser = User.getUserLogged();

    if (estadoUser.id === 1) {
        
        document.querySelector(".navbar-nav").innerHTML += `<li class="nav-item">
        <a class="nav-link admin_page" href="./html/admin.html">ADMIN</a></li>`
        
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
