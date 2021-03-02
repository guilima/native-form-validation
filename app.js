import UserService from './src/user.service.js';
import UserStore from './src/user.store.js';
import RegisterPage from './src/register.page.js';

const userService = new UserService();
const userStore = new UserStore();

(async function() {
    if(!localStorage.getItem('user')) {
        const user = await userService.getUser();
        await userStore.addUser(user)
    }
    switch (window.location.pathname) {
        case '/':
            const registerPage = new RegisterPage();
            registerPage.render();
            break;

        default:

            break;
    }
}());