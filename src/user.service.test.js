import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserService from './user.service.js';
const users = [
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
];
const userService = new UserService();

const server = setupServer(
    rest.get('https://private-21e8de-rafaellucio.apiary-mock.com/users', async (req, res, ctx) => {
        return res(ctx.json(users));
    })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

it('should load user initial state', async () => {
    const VALUE = await userService.getUser();
    expect(users).toEqual(VALUE);
});