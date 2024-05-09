document.addEventListener('DOMContentLoaded', function () {
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbarNav',
        offset: 100  // Ajuste este valor conforme a altura do seu navbar
    });
});
