let users = [];

// CARREGAR UTILIZADORES DA LOCALSTORAGE
export function init() {
  if (localStorage.users) {
    const tempUsers = JSON.parse(localStorage.users);
    for(let user of tempUsers) {
      users.push(new User(user.username, user.password));
    }
  } else {
    users = [];
  }
}

// ADICIONAR UTILIZADOR
export function add(username, password) {
  if (users.some((user) => user.username === username)) {
    throw Error(`O Username:"${username}" ja está a ser utilizado!`);
  } else {
    users.push(new User(username, password));
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// LOGIN DO UTILIZADOR
export function login(username, password, keep=false) {
  const user = users.find((user) => user.username === username && user.password === password);
  if (user) {
    if (keep) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      return true;  
    }else{
      sessionStorage.setItem("loggedUser", JSON.stringify(user));
      return true;
    }
  } else {
    throw Error("Invalid login!");
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
  localStorage.setItem("users", JSON.stringify(users));
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

export function findUser(userId) {
  console.log(users, userId);
  return users.find((user) => user.id == userId);
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

  constructor(username, password) {
    this.id = getNextId();
    this.username = username;
    this.password = password;
  }
}

// export {users};