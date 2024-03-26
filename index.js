// Splash animation
setTimeout(function() {
    var splash = document.querySelector('.splash');
    var container = document.querySelector('.container-fluid');
    // Efeito fade-out
    splash.style.opacity = 0;
    // Parar de mostrar o splash e mostrar o conteudo da página
    setTimeout(function() {
        splash.style.display = 'none';
        container.style.display = 'block';
    }, 100); //Tempo da transição
}, 2000); //Tempo em que o splash aparece


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
