document.getElementById('signup-form').addEventListener('submit', async e=>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    console.log(name, email, password)

    if(!name || !email || !password || !confirmPassword){
        showToast('Please fill in all the fields','warning')
        return;
    }

    if(password != confirmPassword){
        showToast('Passwords are not the same','warning');
        return;
    }

    if(!verifyPassword(password)){
        showToast('Password is not strong enough','warning')
        return;
    }

    const response = await fetch('/signup',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password})
    })


    const data = await response.json();;
    showToast(data.message,'info')
    if(data.success){
        window.location.href = '/login'
    }  
})



function verifyPassword(password) {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return strongRegex.test(password) ? true : false;    //returning boolean value of the password validation check
}
