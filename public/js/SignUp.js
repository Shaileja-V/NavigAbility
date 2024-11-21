document.getElementById('signup-form').addEventListener('submit', async e=>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const role = document.getElementById('role').value;

    console.log(name, email, password, role)

    if(!name || !email || !password || !confirmPassword || !role){
        alert('Please fill in all the fields')
        return;
    }

    if(password != confirmPassword){
        alert('Passwords are not the same');
        return;
    }

    if(!verifyPassword(password)){
        alert('Password is not strong enough')
        return;
    }

    const response = await fetch('/signup',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password,role})
    })


    const data = await response.json();;
    alert(data.message)
    if(data.success){
        window.location.href = '/login'
    }  
})



function verifyPassword(password) {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return strongRegex.test(password) ? true : false;    //returning boolean value of the password validation check
}
