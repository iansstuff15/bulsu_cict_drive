import { handleFirebaseSet,database, registerUserToFirestore } from "../../firebase"

import { auth } from "../../firebase";
import {createUserWithEmailAndPassword} from 'firebase/auth'
export  default async function  handler (req, res)  {

  const body = JSON.parse(req.body);
  
  const email = body.email
  const password = body.password
  const firstName = body.firstName
  const lastName = body.lastName
  const userName = body.userName
  const role = body.role
  const phone = body.phone
  const location = body.location
  console.log(role)
  try {
      await createUserWithEmailAndPassword(auth,email,password)
      const user = await auth.currentUser.uid
      console.log(user)
      const doc =  {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        uid: user,
        phone: phone,
        location: location,
        role: role,
        email: email,
      }
       registerUserToFirestore(
        user,doc
      )
  } catch (error) {
    console.log( 'error: '+error )
    res.status(200).json({ status: error})
  }
 

 
  


  res.status(200).json({ status: "success"})

  
    
 
  }
  