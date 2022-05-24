import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, getCurrentUserDataFromFirestore } from "../../firebase";
import {addDoc,doc,setDoc, collection, getFirestore, getDoc} from 'firebase/firestore'
export  default async function  handler (req, res)  {

  const body = JSON.parse(req.body);
  
  const email = body.email
  const password = body.password
  let data
  try {
    await signInWithEmailAndPassword(auth,email,password)

  } catch (error) {
    console.log( 'error: '+error )
    res.status(200).json({ status: error})
  }

  try {
   
  const user = await auth.currentUser.uid

  const db = getFirestore()

  const docRef = doc(db,'users', user)
  data = await getDoc(docRef).then(
  (doc)=>{
    console.log(doc.data(),doc.id)
    return doc
     
  }
  )
  res.status(200).json({ status: "success", data: data ,user: user })
    
    
  } catch (error) {
    console.log(error)
  }



 
  
  }
  