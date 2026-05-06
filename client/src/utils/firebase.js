
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
   authDomain: "aiinterview-dbc60.firebaseapp.com",
  projectId: "aiinterview-dbc60",
  storageBucket: "aiinterview-dbc60.firebasestorage.app",
  messagingSenderId: "369948577260",
  appId: "1:369948577260:web:fb3962dfe92db17e6d84c9"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}