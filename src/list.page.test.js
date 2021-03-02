import ListPage from './list.page.js';

const listPage = new ListPage();

const KEY = 'user';
const USER_LIST = JSON.stringify([
    {
        "name": "My name 1",
        "cpf": "04080757247",
        "phone": "11987654321",
        "email": "myemail1@test.com.br"
    },
    {
        "name": "My name 2",
        "cpf": "77797584192",
        "phone": "11987654321",
        "email": "myemail2@test.com.br"
    },
    {
        "name": "My name 3",
        "cpf": "45486737688",
        "phone": "11987654321",
        "email": "myemail3@test.com.br"
    }
]);

beforeEach(() => {
    document.body.innerHTML = `
        <div class="container">
            <h1 class="h1">Usuários Cadastrados</h1>
            <section>
                <ul id="listUser" class="list"></ul>
            </section>
        </div>`;

    localStorage.setItem(KEY, USER_LIST);
    listPage.render();
});

afterEach(() => localStorage.clear());

describe('list page', () => {
    it('should render user list', async () => {
        const ITEM = document.querySelectorAll('li');
        const ITEM_COUNT = ITEM.length;
        const FIRST_ITEM_NAME = ITEM[0].querySelector('.h3').textContent;
        const LAST_ITEM_NAME = ITEM[ITEM_COUNT - 1].querySelector('.h3').textContent;

        expect(ITEM_COUNT).toEqual(3);
        expect(FIRST_ITEM_NAME).toEqual("My name 1");
        expect(LAST_ITEM_NAME).toEqual("My name 3");
    });

    it('should remove item from user list', async () => {
        document.querySelector('li .remove-user').click();
        const FIRST_ITEM_NAME = document.querySelector('li .h3').textContent;
        expect(localStorage.__STORE__[KEY]).not.toContain("My name 1");
        expect(FIRST_ITEM_NAME).toEqual("My name 2");
    });
});