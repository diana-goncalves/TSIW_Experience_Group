document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o elemento com a classe 'navbar-toggler'
    var navbarToggler = document.querySelector(".navbar-toggler");

    // Seleciona o elemento com a classe 'navbar-collapse'
    var navbarMenu = document.querySelector(".navbar-collapse");

    // Adiciona um evento de clique ao elemento 'navbarToggler'
    navbarToggler.addEventListener("click", function() {
        // Verifica se a classe 'show' está presente no elemento 'navbarMenu'
        if (navbarMenu.classList.contains("show")) {
            // Se estiver presente, remove a classe 'show' do elemento 'navbarMenu'
            navbarMenu.classList.remove("show");
        } else {
            // Se não estiver presente, adiciona a classe 'show' ao elemento 'navbarMenu'
            navbarMenu.classList.add("show");
        }
    });
});
