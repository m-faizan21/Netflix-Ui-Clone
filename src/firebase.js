import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBFl9g08ijhcukz01rED0zMNyepT2qHmro",
  authDomain: "netflixclone-39512.firebaseapp.com",
  projectId: "netflixclone-39512",
  storageBucket: "netflixclone-39512.firebasestorage.app",
  messagingSenderId: "784923765993",
  appId: "1:784923765993:web:9aafcd2063ee08c96e1478"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
        uid:user.uid,
        name,
        authProvider: "local",
        email,
    }) 
  } catch (error) {
    console.log(error)
     toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const logout = () => {
  signOut(auth);
}


export { auth, db, signup, login, logout };