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
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
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
// forpass.addEventListener("click", function () {
//   var email = document.getElementById("email").value;
//   if (email != "") {
//     window.alert("Please enter Email Id");
//   } else {
//     auth
//       .sendPasswordResetEmail(email)
//       .then(function () {
//         window.alert("Email has been sent to you,please check and verify it.");
//       })
//       .catch(function (error) {
//         var errorCode = error.code;
//         var errorMessage = error.message;

//         console.log(errorCode);
//         window.alert("Message: " + errorMessage);
//       });
//   }
// });

forpass.addEventListener("click", (e) => {
  const auth = getAuth();
  var email = document.getElementById("email").value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
      window.Swal.fire({
        title: "AptiTest",
        text: "Email has been sent to you,please check and verify it.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      //window.alert("Email has been sent to you,please check and verify it.");
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      var error = errorMessage.split("Firebase:")[1].trim();
      //
      Swal.fire({
        title: "AptiTest",
        text: error,
        icon: "error",
        confirmButtonText: "OK",
      });
      //window.alert("Message: " + errorMessage);
    });
});
