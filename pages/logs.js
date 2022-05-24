import Image from "next/image"
import Layout from "../components/layout"
import styles from '../styles/drive.module.css'
import LogItem from "../components/log_item"
import { useEffect, useState } from "react"
import { getLogs } from "../firebase"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
const Logs = () => {    

    
    const [logMap, setLogMap] = useState([])
    useEffect(()=>{
        const logsCollection = collection(db,'logs')
        getDocs(logsCollection).then((snapshot)=>{
         
        let data = {}
          let logs = []
      
          snapshot.docs.forEach((doc)=>{
            logs.push({
              ...doc.data(),id: doc.id
            })
          })
          console.log(logs)
          console.log({...logs})
          setLogMap(logs)
          
          console.log('logs map')
          console.log(logMap)
        
        }).catch(err=>console.log(err.message))
                console.log('data')
              
    },[])


    return(
        <Layout>
            <h1>Logs</h1>
         

            {
                  logMap?
                <>
                {logMap.map((data, index)=>(<LogItem action={data.action} by={data.createdBy} key={index} date={data.id}/>))}
                </>
                    
                  :
                  <h1 className={styles.empty_prompt}>
                  <Image src={'/empty_illustration.png'} width={300} height={300}/>
                  <br/>
                  Oopps this part is this empty...
  
  
                 </h1>
                }
        </Layout>
    )
}

export default Logs