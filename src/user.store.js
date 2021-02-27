const localStorage = window.localStorage;

export function getUser(id) {
    const listUser = JSON.parse(localStorage.getItem('user')) || [];
    return id ? listUser[id] : listUser;
}

export function addUser(user) {
    const listUser = JSON.parse(localStorage.getItem('user')) || [];
    const newListUser = listUser.concat(user);
    return new Promise(resolve => setTimeout(() => resolve(localStorage.setItem('user', JSON.stringify(newListUser))), 2200));
}

export function removeUser(id) {
    const listUser = JSON.parse(localStorage.getItem('user')) || [];
    const newListUser = listUser.filter((_, index) => index !== id)
    localStorage.setItem('user', JSON.stringify(newListUser));
}