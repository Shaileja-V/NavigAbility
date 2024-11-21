// Import the functions you need from the SDKs you need
const { initializeApp } = require( "firebase/app");
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require( "firebase/auth");
// const { ,  }  = require( "firebase/firestore");
const { collection, addDoc, getDocs, getFirestore,doc, deleteDoc,setDoc,getDoc  } = require( "firebase/firestore"); 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMh9rDz2apz7sa7ySZDEU_V4hKrD8bPmI",
  authDomain: "navigability-ab8a9.firebaseapp.com",
  projectId: "navigability-ab8a9",
  storageBucket: "navigability-ab8a9.firebasestorage.app",
  messagingSenderId: "624527189637",
  appId: "1:624527189637:web:ca3e0d4b85a4d51609abec",
  measurementId: "G-91C79G48LL"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebase);

module.exports = {
    createUserWithEmailAndPassword: createUserWithEmailAndPassword,
    signInWithEmailAndPassword: signInWithEmailAndPassword,
    firebase: firebase,
    db: db,
    collection: collection,
    addDoc: addDoc,
    getDocs: getDocs,
    doc: doc,
    deleteDoc: deleteDoc,
    setDoc: setDoc,
    getDoc: getDoc
}