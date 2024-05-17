 // script para o botão remember me

 document.addEventListener('DOMContentLoaded', function () {
    const rememberMeButton = document.querySelector('#lembrarBTN');
    const customCheckbox = document.getElementById('checkbox');

rememberMeButton.addEventListener('click', function () {
    customCheckbox.checked = !customCheckbox.checked;
    rememberMeButton.classList.toggle('checked', customCheckbox.checked);
});
});