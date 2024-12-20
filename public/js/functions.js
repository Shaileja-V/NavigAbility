const getCookie = (cookie_name) => {
    // Construct a RegExp object as to include the variable name
    const re = new RegExp(`(?<=${cookie_name}=)[^;]*`);
    try {
        if (document.cookie.match(re)[0])
            return true // Will raise TypeError if cookie is not found
    } catch {
        return false
    }
}

(
    function islogged() {
        // console.log(getCookie('User_Session'))
        if (getCookie('User_Session')) {
            document.getElementById('login').style.display = 'none'
        } else {
            document.getElementById('logout').style.display = 'none'
        }

    }
)()

// Notifications

function showToast(message,type) {
    console.log(message,type)
    var toast = document.getElementById("toast");
    toast.className = "toast show";
    toast.classList.add(type);
    toast.querySelector('.toast-body').innerText = message;
    setTimeout(function () {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

