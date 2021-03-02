import UserStore from './user.store.js';

export default class ListPage {
    userStore = new UserStore();

    constructor() { }

    render() {
        const ulElement  = document.getElementById('listUser');
        const fragment = document.createDocumentFragment();
        const user = this.userStore.getUser();
        ulElement.innerHTML = '';
        user.forEach((user, index) => {
            const liElement = document.createElement('li');
            const innerFragment = document.createRange().createContextualFragment(`
                <div class="item-content">
                    <h3 class="h3">${user.name}</h3>
                    <p class="text">
                        ${user.email}<br>
                        ${user.cpf}<br>
                        ${user.phone}<br>
                    </p>
                    <i class="btn-link remove-user">Remover</i>
                </div>
            `);
            liElement.appendChild(innerFragment);
            liElement.querySelector('.remove-user').addEventListener('click', this.onRemove.bind(this, index), false);
            liElement.classList.add('item');
            fragment.appendChild(liElement);
        });
        ulElement.appendChild(fragment);
    }

    onRemove(index) {
        this.userStore.removeUser(index);
        this.render();
    }
}