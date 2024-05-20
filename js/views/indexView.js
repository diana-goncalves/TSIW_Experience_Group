
document.addEventListener('DOMContentLoaded', function () {
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbarNav',
        offset: 100  // Ajustar este valor conforme a altura da navbar
    });

});


document.addEventListener('DOMContentLoaded', function () {
    // Opções padrão para todos os gauges
    var opts = {
        angle: 0.35, // O ângulo do arco do gauge
        lineWidth: 0.1, // Largura da linha do gauge
        radiusScale: 1, // Escala do raio do gauge
        pointer: {
            length: 0.6, // Comprimento do ponteiro
            strokeWidth: 0.035, // Largura do ponteiro
            color: '#000000' // Cor do ponteiro
        },
        limitMax: false,     // If false, the max value of the gauge will be updated if value surpass max
        limitMin: false,     // If true, the min value of the gauge will be fixed
        colorStart: '#FFD100',
        colorStop: '#FFEE32',
        strokeColor: '#F4F4F4',
        generateGradient: true,
        highDpiSupport: true,     // High resolution support
    };

    // Inicialização dos gauges
    var target1 = document.getElementById('gauge1'); // Identificação do canvas
    var gauge1 = new Gauge(target1).setOptions(opts); // Criação do gauge
    gauge1.maxValue = 100; // Valor máximo
    gauge1.setMinValue(0);  // Valor mínimo
    gauge1.animationSpeed = 32; // Velocidade da animação
    gauge1.set(78); // Valor inicial

    var target2 = document.getElementById('gauge2');
    var gauge2 = new Gauge(target2).setOptions(opts);
    gauge2.maxValue = 100;
    gauge2.setMinValue(0);
    gauge2.animationSpeed = 32;
    gauge2.set(13);

    var target3 = document.getElementById('gauge3');
    var gauge3 = new Gauge(target3).setOptions(opts);
    gauge3.maxValue = 100;
    gauge3.setMinValue(0);
    gauge3.animationSpeed = 32;
    gauge3.set(9);

    var target4 = document.getElementById('gauge4');
    var gauge4 = new Gauge(target4).setOptions(opts);
    gauge4.maxValue = 100;
    gauge4.setMinValue(0);
    gauge4.animationSpeed = 32;
    gauge4.set(0);
});
