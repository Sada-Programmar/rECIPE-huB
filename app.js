function timegeter(name) {
    var date = new Date()
    var time = date.getHours()
    console.log(time)
    if (time >= 5 && time <= 11) {
        var mess = "Good Morning"
        var text = "What's on the menu for your breakfast?"
    }
    if (time >= 12 && time <= 16) {
        var text = "Feeling hungry? Explore some quick lunch ideas!"
        var mess = "Good Afternoon"
    }
    if (time >= 17 && time <= 20) {
        var text = "Time for some evening treats! What’s cooking?"
        var mess = "Good Evening"
    }
    if (time >= 20 || time < 5) {
        var text =  "Craving something special for dinner?"
        var mess = "Good Night"
    }
    console.log(mess)
    document.querySelector('#h2-1').textContent = text
    document.querySelector('#noont').textContent = `${mess} ${name}`
}


async function hiii() {
    try {
        const user = await loginuser()
        return user
    } catch (error) {
        console.log(error, "error aya hai")
        // window.location = "login1.html"
    }
}
async function foo() {
    const finaldata = await hiii()
    var username = `${finaldata.firstname} ${finaldata.lastname}`
    console.log(username)
    timegeter(username)
}
foo()

import { loginuser } from "./firebase.js"
