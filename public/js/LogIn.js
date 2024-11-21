document.getElementById('login-form').addEventListener('submit', async e=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
    })
    const data = await response.json();
    alert(data.message);
    if(data.success){
        window.location.href = data.redirect;
    }

})