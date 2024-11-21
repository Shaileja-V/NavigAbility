document.getElementById('contact-form').addEventListener('submit', async e =>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const subject = document.getElementById('subject').value;

    const response = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, subject })
    });

    const data = await response.json();
    alert(data.message);
    const {success} = data;
    if(success){
        window.location.reload();
    }
})