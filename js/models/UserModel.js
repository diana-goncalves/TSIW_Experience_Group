let users = [];
let blockedUsers = [];

// CARREGAR UTILIZADORES DA LOCALSTORAGE
export function init() {
  if (localStorage.users) {
    const tempUsers = JSON.parse(localStorage.users);
    for(let user of tempUsers) {
      users.push(new User(user.username, user.password, user.victory, user.collectibles, user.blocked, user.firstName, user.lastName, user.birthdate, user.location, user.gender));
    }
    blockedUsers = users.filter(user => user.blocked).map(user => user.username);
  } else {
    users = [];
  }
}

// ADICIONAR UTILIZADOR
export function add(username, password, victory, collectibles) {
  if (users.some((user) => user.username === username)) {
    throw Error(`O Username:"${username}" ja está a ser utilizado!`);
  } else {
    users.push(new User(username, password, victory, collectibles));
    localStorage.setItem("users", JSON.stringify(users));
  }
}

export function editUser(username, userData) {
  const user = users.find((user) => user.username === username);

  if (user) {
    // Passar propriedades do userData para o user;
    Object.assign(user, userData);
    // Atualizar local storage
    localStorage.setItem("users", JSON.stringify(users));

    // Trocar dados na sessions storage para atualizar logo os forms no perfil
    const loggedUser = getUserLogged();
    if (loggedUser.username === username) {
      sessionStorage.setItem("loggedUser", JSON.stringify(user));
    }

  } else {
    throw Error("Utilizador não encontrado!");
  }

}

// LOGIN DO UTILIZADOR
export function login(username, password, keep=false) {
  const user = users.find((user) => user.username === username && user.password === password);
  const bloqueado = user.blocked;

  if (user && !bloqueado) {
    if (keep) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      return true;  
    }else{
      sessionStorage.setItem("loggedUser", JSON.stringify(user));
      return true;
    }
  } else { 
    
    if (bloqueado) {
      throw Error("Conta bloqueada!");
    } else {
      throw Error("Palavra-passe ou nome de utilizador incorreto");
    }   
    
  }
}

// LOGOUT DO UTILIZADOR
export function logout() {
  if (sessionStorage.loggedUser) {
    sessionStorage.removeItem("loggedUser");
  }
  if (localStorage.loggedUser) {
    localStorage.removeItem("loggedUser");
  }
}

// REMOVER USER ( ADMIN )
export function removeUser(username) {
  users = users.filter((user) => user.username !== username);
  blockedUsers = blockedUsers.filter((user) => user !== username);
  localStorage.setItem("users", JSON.stringify(users));
}

// BLOQUEAR/DESBLOQUEAR USER ( ADMIN )
export function blockUser(username) {
  const user = users.find((user) => user.username === username);

  if (user) {
    user.blocked = !user.blocked;

    if (user.blocked) {
      if (!blockedUsers.includes(username)) {
        blockedUsers.push(username);
      }
    } else {
      blockedUsers = blockedUsers.filter((user) => user !== username);
    }

    localStorage.setItem("users", JSON.stringify(users));

  } else {
    throw Error("Utilizador não encontrado!");
  }
  
}

// VERIFICA EXISTÊNCIA DE ALGUÉM AUTENTICADO
export function isLogged() {
  if (localStorage.loggedUser) {
    return true;
  }else{
    return sessionStorage.getItem("loggedUser") ? true : false;
  }
}

// DEVOLVE UTILZIADOR AUTENTICADO
export function getUserLogged() {
  if (localStorage.loggedUser) {
    return JSON.parse(localStorage.getItem("loggedUser"));
  }else{
    return JSON.parse(sessionStorage.getItem("loggedUser"));
  }
}

export function findUser(username) {
  return users.find((user) => user.username === username);
}

function getNextId() {
  return users.length > 0 ? users.length + 1 : 1;
}

export function getUsers(filterName = "", isSorted = false) {
  // Criar nova array caso o admin queira procurar por um nome
  let filteredUsers = users.filter((user) => (user.username.toLowerCase().includes(filterName.toLowerCase()) || filterName === ""));

  filteredUsers = isSorted
    ? filteredUsers.sort((a, b) => a.username.localeCompare(b.username))
    : filteredUsers; 

  return filteredUsers;  
}

export function sortUsers(list) {
  
  let sortedUsers = list.sort((a, b) => a.username.localeCompare(b.username));

  return sortedUsers;
}

/**
 * CLASSE QUE MODELA UM UTILIZADOR NA APLICAÇÃO
 */
class User {
  id = null;
  username = "";
  password = "";
  victory = null;
  collectibles = [];
  blocked = false;
  firstName = null;
  lastName = null;
  birthdate = null;
  location = null;
  gender = null;

  constructor(username, password, victory=false, collectibles=[], blocked=false, firstName=null, lastName=null, birthdate=null, location=null, gender=null) {
    this.id = getNextId();
    this.username = username;
    this.password = password;
    this.victory = victory;
    this.collectibles = collectibles;
    this.blocked = blocked;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.location = location;
    this.gender = gender;
  }
}
