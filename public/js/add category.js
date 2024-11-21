
document.getElementById('submit-blog').addEventListener('submit', async e =>{
    e.preventDefault();

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const message = document.getElementById('message').value;

    const response = await fetch('/add-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, message })
    });

    const data = await response.json();
    alert(data.message);
    const {success} = data;
    if(success){
        // window.location.href = '/dashboard';
        window.location.reload();
    }
})
