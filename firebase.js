import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";




// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeD_ueFUH_te1d79bqiM7RAdwuU9d3hrE",
    authDomain: "recipe-hub-13564.firebaseapp.com",
    projectId: "recipe-hub-13564",
    storageBucket: "recipe-hub-13564.firebasestorage.app",
    messagingSenderId: "874857620636",
    appId: "1:874857620636:web:5599cb4282b45b9dee3959",
    measurementId: "G-G45M2C74GQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();

async function usersdata() {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    const datausers = querySnapshot.docs.map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        id: doc.id,
        ...doc.data()
    }));
    return datausers
}
function loginuser() {
    return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
            if (user) {
                var userid = user.uid
                resolve(loginuserdata(userid))
                
            } else {
                reject("user not found")
            }
        });

    })
}
async function loginuserdata(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        var data = docSnap.data()
        console.log("Document data:", docSnap.data());
        return data
        console.log(data);
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

function signup(email, password, username, firstname, lastname) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("Sign up Howa")
            // ...

            try {
                return setDoc(doc(db, "users", user.uid), {
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    email: email,
                    password: password,
                });
                console.log("sab donee")

            } catch (error) {
                console.log(error, "ye error aya store karata howa")
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorMessage + "Sign up NHi Howa")

            // ..
        });
}

async function login(email, password) {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        loginuser = user.user.uid
        return loginuser

    } catch (error) {
        throw error.code
    }
}



export { signup, usersdata, login, loginuser, loginuserdata}

