// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Function to initialize Firebase authentication
export const initAuth = () => {


  // Clear any existing log-in sessions
  signOut(auth);

  // Firebase login state
  onAuthStateChanged(auth, (firebaseUser) => {
    const loggedInStatus = document.getElementById('loggedInStatus');
    const depositLink = document.getElementById('depositLink');
    const withdrawLink = document.getElementById('withdrawLink');
    const balanceLink = document.getElementById('balanceLink');
    const createLink = document.getElementById('createLink');
    const loginLink = document.getElementById('loginLink');
    const logoutLink = document.getElementById('logoutLink');
    
    if (firebaseUser) {
      console.log('Firebase Auth Logged-In: ' + firebaseUser.email);
      loggedInStatus.innerText = firebaseUser.email;
      createLink.style.display = "none";
      loginLink.style.display = "none";
      logoutLink.style.display = "inline-block";
      depositLink.style.display = "inline-block";
      withdrawLink.style.display = "inline-block";
      balanceLink.style.display = "inline-block";
    } else {
      console.log('Firebase Auth Logged-Out');
      loggedInStatus.innerText = "Logged-Out";
      createLink.style.display = "inline-block";
      loginLink.style.display = "inline-block";
      logoutLink.style.display = "none";
      depositLink.style.display = "none";
      withdrawLink.style.display = "none";
      balanceLink.style.display = "none";
    }
  });
};

