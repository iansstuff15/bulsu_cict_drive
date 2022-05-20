import { handleFireBaseUserGet, handleFirebaseSet, database } from "../../firebase"

import { auth } from "../../firebase";

export  default async function  handler (req, res)  {

  


  await auth.signOut()



  res.status(200).json({ res: 'OK' })
  }
  