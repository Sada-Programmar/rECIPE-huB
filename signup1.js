
var signbtn = document.querySelector('.submit-btn')
console.log(signbtn)
signbtn.addEventListener('click', async function () {

    clearAllErrors(); // Har submit se pehle borders hat jayein

    var userinfos = JSON.parse(localStorage.getItem('userinfos')) || []

    var firstname21 = document.querySelector('#firstname')
    var lastname21 = document.querySelector('#lastname')
    var username21 = document.querySelector('#username')
    var email21 = document.querySelector('#email')
    var password21 = document.querySelector('#password')
    var confirmpassword = document.querySelector('#confirmpassword').value
    var check = document.querySelector('#check').checked

    var firstname = firstname21.value
    var lastname = lastname21.value
    var username = username21.value
    var email = email21.value
    var password = password21.value

    if (firstname && lastname && username && email && password && confirmpassword && check) {
        username.toLowerCase()
        var username1 = [...username]
        var username2 = []
        var alphabates = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        alphabates.forEach(function (letter) {
            username1.forEach(function (letters) {
                if (letter == letters) {
                    username2.push(letters)
                }
            })
        });
        if (username1.length != username2.length) {
            showError('username', 'Username Only in lowercase LETTERS.')
            return
        }
        var emailrogex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailrogex.test(email)){
            showError('email',"Pls Enter Correct Email")
            return
        }
        var password1 = [...password]
        if (password1.length < 8) {
            showError('password', "Enter A longer Password Atleast 8 characters")
            return
        }
        var password2 = []
        alphabates.forEach(function (letter) {
            password1.forEach(function (letters) {
                if (letter == letters) {
                    password2.push(letters)
                }
            })
        });
        var number = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        var password3 = []
        number.forEach(function (digit) {
            password1.forEach(function (digit1) {
                if (digit1 == digit) {
                    password3.push(digit)
                }
            })
        })
        if (password1.length == password2.length) {
            showError('password', "Make It Strong Using i.e (1,2,..,10 OR @,$,#)")
            return
        }
        if (password3.length == password1.length) {
            showError('password', "MIx Password With Numbers oR Letters")
            return
        }
        var confirmpassword1 = [...confirmpassword]
        var confirmpassword2 = []
        var i = 0
        confirmpassword1.forEach(function (digit3) {
            if (digit3 == password1[i]) {
                confirmpassword2.push(digit3)
                i++
            }
        })
        if (confirmpassword1.length != confirmpassword2.length) {
            showError('confirmpassword', "Invalid Your Confirm Password Is'nt Matched")
            return
        }
        try {
            async function hii() {
                var Alluserdata = await usersdata();
                for (const a of Alluserdata) {
                    if (a.username == username) {
                        showError('username', "Username Already Contain");
                        return
                    }
                }
                for(const b of Alluserdata){
                    if(b.email == email){
                        showError('email',"Already Logged in Go TO Login")
                        return
                    }
                }
                await signup(email, password, username, firstname, lastname)
                console.log("jaan choti")
                window.location = 'index.html'
            }
            hii()

        } catch (error) {
            console.log(error, "mar gayyy")
        }


        // userinfos.push(userdetail)
        // localStorage.setItem('userinfos',JSON.stringify(userinfos))

    }
    else {
        if (!firstname) {
            showError('firstname', 'First name is required.')
        }
        if (!lastname) {
            showError('lastname', 'Last name is required.')
        }
        if (!username) {
            showError('username', 'Username is required.')
        }
        if (!email) {
            showError('email', 'Email is required.')
        }
        if (!password) {
            showError('password', 'Password is required.')
        }
        if (!confirmpassword) {
            showError('confirmpassword', 'Confirm password is required.')
        }
        if (!check) {
            showError('check', ' Check The Terms & Conditions.To Proceed')
        }
    }
})




// fire Base Area



import { signup, usersdata } from "./firebase.js";




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


function clearAllErrors() {
    ['firstname', 'lastname', 'username', 'email', 'password', 'confirmpassword'].forEach(clearError);
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









