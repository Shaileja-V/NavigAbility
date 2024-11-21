
describe('Login', () => {
    test('Should return success', async () => {
        const email = 'admin@gmail.com'
        const password = 'admin123'

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await response.json();
        const { success } = data;
        expect(success).toBe(true);
    });

    test('Should return false', async () => {
        const email = 'someon@example.com'
        const password = 'randomPassword'

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await response.json();
        const { success } = data;
        expect(success).toBe(false);
    })
})