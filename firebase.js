
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDj2Lz9qCzqaqFKbcKooEcYhEnd9SXr6b4",
    authDomain: "notesappreact-d6994.firebaseapp.com",
    projectId: "notesappreact-d6994",
    storageBucket: "notesappreact-d6994.appspot.com",
    messagingSenderId: "1095092571841",
    appId: "1:1095092571841:web:46d4c699b214da68ec4e40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes")
