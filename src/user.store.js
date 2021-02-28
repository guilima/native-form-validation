export default class UserStore {
    localStorage = window.localStorage;

    constructor() { }

    getUser(id) {
        const listUser = JSON.parse(this.localStorage.getItem('user')) || [];
        return id ? listUser[id] : listUser;
    }

    addUser(user) {
        const listUser = JSON.parse(this.localStorage.getItem('user')) || [];
        const newListUser = listUser.concat(user);
        return new Promise(resolve => setTimeout(() => resolve(this.localStorage.setItem('user', JSON.stringify(newListUser))), 2200));
    }

    removeUser(id) {
        const listUser = JSON.parse(this.localStorage.getItem('user')) || [];
        const newListUser = listUser.filter((_, index) => index !== id)
        this.localStorage.setItem('user', JSON.stringify(newListUser));
    }
}