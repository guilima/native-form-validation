export default class UserService {
    url = 'https://private-21e8de-rafaellucio.apiary-mock.com';

    constructor() { }

    async getUser() {
        const response = await fetch(`${this.url}/users`)
        .catch((error) => {
            console.error('Error:', error);
        });
        return response.json();
    }
}