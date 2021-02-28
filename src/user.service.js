export async function fetchUser() {
    const response = await fetch('https://private-21e8de-rafaellucio.apiary-mock.com/users')
        .catch((error) => {
            console.error('Error:', error);
        });
    return response.json();
}