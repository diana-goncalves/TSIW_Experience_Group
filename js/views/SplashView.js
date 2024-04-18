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
