import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD1MwVt3-HaIQjS-bZf1K5hq26w3eGeFwk",
    authDomain: "growfood-ea602.firebaseapp.com",
    projectId: "growfood-ea602",
    storageBucket: "growfood-ea602.appspot.com",
    messagingSenderId: "226442512041",
    appId: "1:226442512041:web:84ee17e1693374b2e7cbb8",
    measurementId: "G-X7C14QPZG0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
