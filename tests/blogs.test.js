describe('adding a blog', ()=>{
    test('Should return true', async ()=>{
        const title = 'My First Blog';
        const message = 'This is my first blog post'
        const category = 'products';
        const uid = 'TNueD2Wi1IWmco7gVhNVF2sYbdv2'
        
        const response = await fetch('http://localhost:3000/add-blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                message,
                category,
                uid
            })
        })
        const data = await response.json();
        const { success } = data;
        expect(success).toBe(true);
    })
})