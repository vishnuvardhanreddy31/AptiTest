// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdAo7h2gVigdL0NYkK2hcKEYI7UjTYbtY",
  authDomain: "aptitest-4fa07.firebaseapp.com",
  databaseURL: "https://aptitest-4fa07-default-rtdb.firebaseio.com",
  projectId: "aptitest-4fa07",
  storageBucket: "aptitest-4fa07.appspot.com",
  messagingSenderId: "555439862885",
  appId: "1:555439862885:web:bf54ae8dc265d5bc99428c",
  measurementId: "G-W8XFYM79Y8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth();

// firebase.auth.Auth.Persistence.LOCAL;
signup.addEventListener("click", (e) => {
  var username = document.getElementById("username").value;
  var email = document.getElementById("email1").value;

  var password = document.getElementById("password1").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      set(ref(database, "userswithemail/" + user.uid), {
        username: username,
        email: email,
        password: password,
      });

      Swal.fire({
        title: "AptiTest",
        text: "User Created",
        icon: "success",
        confirmButtonText: "OK",
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      var error = errorMessage.split(" ")[1];

      // alert(errorMessage);
      Swal.fire({
        title: "AptiTest",
        text: error,
        icon: "error",
        confirmButtonText: "OK",
      });
      // ..
    });
});
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    window.location.href = "mainpage.html";

    // ...
  } else {
    // User is signed out
    // ...
    // window.alert("Please login");
    Swal.fire({
      title: "AptiTest",
      text: "Please Login",
      icon: "warning",
      confirmButtonText: "OK",
    });
    // window.location.href = "index.html";
  }
});

login.addEventListener(
  "click",
  (e) => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const dt = new Date();
        update(ref(database, "userswithemail/" + user.uid), {
          last_login: dt,
        });

        // alert("user login successfull");
        Swal.fire({
          title: "AptiTest",
          text: "User login successfull",
          icon: "success",
          confirmButtonText: "OK",
        });
        window.location.href = "mainpage.html";
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        var error = errorMessage.split("Firebase:")[1].trim();
        // alert(errorMessage);
        Swal.fire({
          title: "AptiTest",
          text: error,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  },
  { remember: "local" }
);

loginWithGoogle.addEventListener(
  "click",
  (e) => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // Signed in with Google
        const user = result.user;
        const dt = new Date();
        set(ref(database, "userswithemail/" + user.uid), {
          username: user.displayName,
          email: user.email,
          last_login: dt,
        });
        // alert("user login successful");
        Swal.fire({
          title: "AptiTest",
          text: "User login successfull",
          icon: "success",
          confirmButtonText: "OK",
        });
        window.location.href = "mainpage.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        var error = errorMessage.split("Firebase:")[1].trim();
        // alert(errorMessage);
        Swal.fire({
          title: "AptiTest",
          text: error,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  },
  { remember: "local" }
);

// logout.addEventListener("click", (e) => {
//   signOut(auth)
//     .then(() => {
//       // Sign-out successful.
//       alert("signout successfull");
//     })
//     .catch((error) => {
//       // An error happened.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       alert(errorMessage);
//     });
// });

// const user1 = auth.currentUser;

// if (user1 !== null) {
//   user1.providerData.forEach((profile) => {
//     console.log("Sign-in provider: " + profile.providerId);
//     console.log("  Provider-specific UID: " + profile.uid);
//     console.log("  Name: " + profile.displayName);
//     console.log("  Email: " + profile.email);
//     console.log("  Photo URL: " + profile.photoURL);
//   });
// }
