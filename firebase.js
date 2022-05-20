// import  firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/database";
// import { getDatabase, ref, set } from "firebase/compat/database";

import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getStorage, } from 'firebase/storage'
import {addDoc,doc,setDoc, collection, getFirestore, getDoc} from 'firebase/firestore'
const config = {
  apiKey: "AIzaSyBWw1pr5xvJSTjqHhgd281upJ3GDb0NrbE",
  authDomain: "cict-d.firebaseapp.com",
  projectId: "cict-d",
  storageBucket: "cict-d.appspot.com",
  messagingSenderId: "971679425503",
  appId: "1:971679425503:web:bdffff1303d0502cd15a6a",
  measurementId: "G-P2G28WXNYP"
  
};

 initializeApp(config)




  // export default firebase;
  // export const database = firebase.database();
export const auth = getAuth();
   
const db = getFirestore()


export const registerUserToFirestore  = (docUID,data) =>{
  // const userCollection = collection(db,'users')
  // const userRef = doc(db,userCollection,docUID)
  // addDoc(userRef, data)

  const docRef = doc(db, 'users',docUID)
  setDoc(docRef,data)
}


export const getCurrentUserDataFromFirestore = (docUID)=>{
  var data
  const docRef = doc(db,'users', docUID)
  getDoc(docRef).then(
  (doc)=>{
    console.log(doc.data(),doc.id)
    data = doc.data
    
  }
  )
  return data
}

export const storage = getStorage()