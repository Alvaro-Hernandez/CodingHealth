import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMq053lTIxpz6HFlh1L_NzkTty-vajTXo",
  authDomain: "cartilife-4d947.firebaseapp.com",
  projectId: "cartilife-4d947",
  storageBucket: "cartilife-4d947.appspot.com",
  messagingSenderId: "333742100612",
  appId: "1:333742100612:web:68bbf6c361a8ce2bbdf2d1",
};

// Initialize Firabase
const app = firebase.initializeApp(firebaseConfig);

// Use these for firestore y authentication
const auth = firebase.auth();
const db = app.firestore();

// Export
export { auth, db };
