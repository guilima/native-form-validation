import UserService from './src/user.service.js';
import UserStore from './src/user.store.js';
import ListPage from './src/list.page.js';
import RegisterPage from './src/register.page.js';

const userService = new UserService();
const userStore = new UserStore();

(async function() {
    if(!localStorage.getItem('user')) {
        const div = document.createElement("div");
        div.classList.add('loader');
        document.body.classList.add('screen');
        document.body.prepend(div);
        const user = await userService.getUser();
        await userStore.addUser(user)
        document.body.classList.remove('screen');
        div.classList.remove('loader');
    }
    switch (window.location.pathname) {
        case '/':
            const registerPage = new RegisterPage();
            registerPage.render();
            break;

        case '/listar.html':
            const listPage = new ListPage();
            listPage.render();
            break;

        case '/404.html':
            break;

        default:
            window.location.href = "/404.html";
            break;
    }
}());