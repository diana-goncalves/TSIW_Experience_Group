
// Scrollspy bootstrap
document.addEventListener('DOMContentLoaded', function () {
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbarNav',
        offset: 100  // Ajustar este valor conforme a altura da navbar
    });

})

// Gauge
document.addEventListener('DOMContentLoaded', function () {
    // Opções padrão para todos os gauges
    var opts = {
        angle: 0.50,
        lineWidth: 0.1,
        radiusScale: 1,
        limitMax: false,     // If false, the max value of the gauge will be updated if value surpass max
        limitMin: false,     // If true, the min value of the gauge will be fixed
        colorStart: '#FFD100',
        colorStop: '#FFEE32',
        strokeColor: '#F4F4F4',
        generateGradient: true,
        highDpiSupport: true,
        pointer: {
            length: 0,
            strokeWidth: 0,
            color: 'transparent'
        }
    };

    // Inicialização dos gauges
    var target1 = document.getElementById('gauge1'); // Identificação do canvas
    var gauge1 = new Donut(target1).setOptions(opts); // Criação do gauge
    gauge1.maxValue = 100; // Valor máximo
    gauge1.setMinValue(0);  // Valor mínimo
    gauge1.animationSpeed = 100; // Velocidade da animação
    gauge1.set(78); // Valor inicialƒ

    var target2 = document.getElementById('gauge2');
    var gauge2 = new Donut(target2).setOptions(opts);
    gauge2.maxValue = 100;
    gauge2.setMinValue(0);
    gauge2.animationSpeed = 100;
    gauge2.set(13);

    var target3 = document.getElementById('gauge3');
    var gauge3 = new Donut(target3).setOptions(opts);
    gauge3.maxValue = 100;
    gauge3.setMinValue(0);
    gauge3.animationSpeed = 100;
    gauge3.set(9);

    var target4 = document.getElementById('gauge4');
    var gauge4 = new Donut(target4).setOptions(opts);
    gauge4.maxValue = 100;
    gauge4.setMinValue();
    gauge4.animationSpeed = 100;
    gauge4.set(0);
});
