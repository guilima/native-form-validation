import { addUser, getUser, removeUser } from './user.store.js';

const KEY = 'user';
const USER = {
    cpf: '04080757247',
    email: 'myemail1@test.com.br',
    name: 'My name 1',
    phone: '11987654321'
};
const USER_LIST = JSON.stringify([USER]);
const USER_LIST_EMPTY = JSON.stringify([]);
beforeEach(() => {
    localStorage.clear();
});
describe('add/remove user', () => {
    test('should add user to store', async () => {
        expect.assertions(2);
        await addUser(USER);
        expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, USER_LIST);
        expect(localStorage.__STORE__[KEY]).toBe(USER_LIST);
    });

    test('should remove user from store', () => {
        const VALUE = 0;
        removeUser(VALUE);
        expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, USER_LIST_EMPTY);
        expect(localStorage.__STORE__[KEY]).toBe(USER_LIST_EMPTY);
    });
});

describe('get user', () => {
    test('should get user from store', () => {
        const VALUE = 0;
        localStorage.setItem(KEY, USER_LIST);
        const user = JSON.stringify(getUser(VALUE));
        expect(localStorage.__STORE__[KEY]).toContain(user);
    });
    test('should get all user from store', () => {
        localStorage.setItem(KEY, USER_LIST);
        const listUser = JSON.stringify(getUser());
        expect(localStorage.__STORE__[KEY]).toBe(listUser);
    });
});