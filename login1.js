function showError(elementId, message) {
    var element = document.querySelector("#" + elementId);
    var errorSpan = document.querySelector("#" + elementId + "-error");

    if (element) {
        element.classList.add('error-border');
    }
    if (errorSpan) {
        errorSpan.textContent = message;
    }
}

function showMainError(message) {
    document.querySelector("#main-error").textContent = message;
    document.querySelector("#main-error").style.display = 'block';
}

function clearMainError() {
    document.querySelector("#main-error").textContent = '';
    document.querySelector("#main-error").style.display = 'none';
}

function clearError(elementId) {
    var element = document.querySelector("#" + elementId);
    var errorSpan = document.querySelector("#" + elementId + "-error");

    if (element) {
        element.classList.remove('error-border');
    }
    if (errorSpan) {
        errorSpan.textContent = '';
    }
}

function clearAllErrors() {
    clearError('email');
    clearError('password');
}


var button = document.querySelector('#login-btn')
button.addEventListener('click', function () {

    clearAllErrors();
    clearMainError();
    var email1 = document.querySelector("#email")
    var password1 = document.querySelector("#password")
    


    var email = email1.value
    var password = password1.value

    let hasError = false;

    if (!email) {
        showError('email', "Email address is required.")
        hasError = true;
    }
    if (!password) {
        showError('password', "Password is required.")
        hasError = true;
    }

    if (hasError) {
        return;
    }
    
    
    async function yoo() {
        try {
            var user = await login(email,password);
            console.log(user)

            window.location = 'index.html'
        } catch (errorCode) {
            showMainError("Invalid Email Or Password")
        }
    }
    yoo()
})


import { login } from "./firebase.js";
