import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBNeEZVK6qNzxlMatXygN6DW9OhwiBwN_I",
    authDomain: "signal-clone-3d800.firebaseapp.com",
    projectId: "signal-clone-3d800",
    storageBucket: "signal-clone-3d800.appspot.com",
    messagingSenderId: "806886571074",
    appId: "1:806886571074:web:d839be0493bcb0f5fa01db"
};

const app = initializeApp(firebaseConfig);


const db = getFirestore();
const auth = getAuth(app);

export {db, auth}