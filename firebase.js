
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getStorage, listAll,ref} from 'firebase/storage'
import {addDoc,doc,setDoc, collection, getFirestore, getDoc,getDocs} from 'firebase/firestore'
/* Initializing the firebase app with the config object. */
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
 
  



   
/* Exporting the auth and db variables from the firebase library. */
export const db = getFirestore()
export const auth = getAuth();

/**
 * It takes a user's UID and data, and then sets the data to the user's document in the users
 * collection
 * @param docUID - The document ID of the user.
 * @param data - the data you want to store in the database
 */
export const registerUserToFirestore  = (docUID,data) =>{


  const docRef = doc(db, 'users',docUID)
  setDoc(docRef,data)
}

/**
 * It takes a document UID and some data, and then adds that data to the document with the UID
 * @param docUID - The unique ID of the document you want to add the data to.
 * @param data - the data you want to add to the document
 */
export const AddLevel  = (docUID,data) =>{

 const now = Date()
  // const userCollection = collection(db,'users')
  // const userRef = doc(db,userCollection,docUID)
  // addDoc(userRef, data)

  const docRef = doc(db, 'files',docUID)
  setDoc(docRef,data)
  const logRef = doc(db, 'logs',now)
  setDoc(logRef,data)
}
/**
 * It takes a levelUID, data, and a phaseUID as arguments. It then creates a document reference for the
 * levelUID, a collection reference for the phases, a document reference for the phaseUID, and sets the
 * data to the document reference for the phaseUID. It then creates a log reference for the current
 * date and time, and sets the data to the log reference
 * @param levelUID - The UID of the level you want to add the phase to.
 * @param data - the data you want to add to the database
 * @param phaseUID - The UID of the phase you want to add.
 */
export const AddPhase  = (levelUID,data,phaseUID) =>{

  const now = Date()
 
  const docRef = doc(db, "files", levelUID);
  const colRef = collection(docRef, 'phases')
  const docRefPhase = doc(colRef, phaseUID);
  setDoc(docRefPhase, data);
  const logRef = doc(db, 'logs',now)
  
  //  const docRef = doc(db, 'files',docUID)
  //  setDoc(docRef,data)
  
   setDoc(logRef,data)
 }
/**
 * It takes a levelUID, data, phaseUID, and areaUID as arguments and then creates a document reference
 * for the levelUID, a collection reference for the phaseUID, a document reference for the phaseUID,
 * and a collection reference for the areaUID. Then it sets the data to the areaUID document reference
 * @param levelUID - The UID of the level you want to add the area to.
 * @param data - the data you want to add to the database
 * @param phaseUID - The UID of the phase you want to add the area to.
 * @param areaUID - The UID of the area you want to add the data to.
 */
 export const AddArea  = (levelUID,data,phaseUID,areaUID) =>{

  const now = Date()
 
  const docRef = doc(db, "files", levelUID);
  const colRef = collection(docRef, 'phases')
  const docRefPhase = doc(colRef, phaseUID);
  const colRefPhase = collection(docRefPhase, 'areas')
  const docRefAreas = doc(colRefPhase,areaUID)


  setDoc(docRefAreas, data);
  const logRef = doc(db, 'logs',now)
  
  //  const docRef = doc(db, 'files',docUID)
  //  setDoc(docRef,data)
  
   setDoc(logRef,data)
 }


/**
 * It gets all the documents from the logs collection in the database and returns them as an array of
 * objects
 */
export const getLogs = () => {

  const logsCollection = collection(db,'logs')
  
  getDocs(logsCollection).then((snapshot)=>{
   
    
    let logs = []

    snapshot.docs.forEach((doc)=>{
      logs.push({
        ...doc.data(),id: doc.id
      })
    })
    console.log(logs)

    return(logs)

  }).catch(err=>console.log(err.message))

  
 
}
/**
 * It returns a promise that resolves to an array of objects
 */
export const getLevels = () => {


  

  const levelCollection = collection(db,'files')
 
  getDocs(levelCollection).then((snapshot)=>{
    console.log(snapshot.docs)
    
    let levels = []

    snapshot.docs.forEach((doc)=>{
      levels.push({
        ...doc.data(),id: doc.id
      })
    })
    console.log(levels)
    
    return(levels)

  }).catch(err=>console.log(err.message))

  
 
}

/**
 * It returns the data of the current user from the Firestore database
 * @param docUID - the document id of the user you want to get data from
 */
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


