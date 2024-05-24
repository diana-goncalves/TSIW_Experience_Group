import * as User from "../models/UserModel.js"

User.init()

// Guardar scripts já carregadas para evitar carregar 2x. ( new set() é como uma array mas não permite duplicados)
// const loadedScripts = new Set();

const loadedScripts = [];

// User que está logado
let estadoUser = User.getUserLogged();

if(estadoUser) {
    
    // Mudar username
    document.querySelector(".headerAccount").innerHTML = `${estadoUser.username}`;

    // Logout
    document.querySelector(".logoutButton").addEventListener("click", event => {
        event.preventDefault()

        if (confirm("Queres mesmo terminar sessão?")) {
            
            User.logout()
            
            location.href = "../../index.html";
            
        }
    })

        initDashboard(); 

} else {
    alert("Tens que fazer login primeiro!")
    
    location.href = "../../html/login.html";

}


// Função que carrega primeiro script ( users ) e chama função que carrega os restantes tabs

function initDashboard() {
    // Selecionar os botões que mudam as tabs
    const tabButtons = document.querySelectorAll('[data-bs-toggle="pill"]');

    loadTabScript("pills-users");
    
    tabButtons.forEach(button => {
        
        button.addEventListener('show.bs.tab', (event) => {
            
            // id da tab atual (subString(1) tira o #)
            const currentTab = event.target.getAttribute('data-bs-target').substring(1);

            // Carregar script da view da tab atual
            loadTabScript(currentTab);

        })

    })

}

function loadTabScript(tab) {
    
    // Verificar se a script já foi carregada para prevenir carregar a mesma script duas vezes
    if (loadedScripts.includes(tab)) {
        return;
    }

    // criar novo <script></script>
    const scriptElement = document.createElement("script");

    // adicionar type="module" para conseguir dar import dos modules
    scriptElement.setAttribute("type", "module");
    
    scriptElement.src = `../js/views/adminTabs/${tab}.js`

    scriptElement.addEventListener("load", () => {
        
        // Adicionar script à lista de scripts carregados
        
        loadedScripts.push(tab);

    });

    scriptElement.addEventListener("error", (error) => {
        alert(`Erro a carregar script ${tab}`,error);
    })
    
    // adicionar <script> ao body da admin.html
    document.body.appendChild(scriptElement);

}
