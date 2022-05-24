import Image from "next/image"
import { useSnapshot } from "valtio"
import Folder from "../components/folder"
import Layout from "../components/layout"
import LogItem from "../components/log_item"
import NavigateTo from "../components/navigate_to"
import styles from '../styles/dashboard.module.css'
import { state } from "../state/state";
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import { useEffect, useState } from "react"
const DashBoard = () => {

    const snapshot = useSnapshot(state)
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
            <div className={styles.welcome}>
           
            <br/>
            <strong className={styles.welcome_text}>Welcome Back, {snapshot.firstName}! 👋</strong>
         
            <br/>
            <hr className={styles.horizontal_line}/>
            </div>
            <h1 className={styles.section_text}>Places</h1>
            <h4 className={styles.section_subtext}>to navigate</h4>
            <NavigateTo to={'/drive/level'}/>
            <NavigateTo to={'/drive/phase'}/>
            <NavigateTo to={'/drive/areas'}/>
            <NavigateTo to={'/drive/files'}/>
            <br/>
            <br/>


            {/* <h1 className={styles.section_text}>Areas</h1>
            <h4 className={styles.section_subtext}>at a glance</h4>
            <Folder name={'Faculty'}/>
            <Folder name={'Faculty'}/>
            <Folder name={'Faculty'}/>
            <Folder name={'Faculty'}/>
            <Folder name={'Faculty'}/>
            <Folder name={'Faculty'}/>
            <Folder name={'Faculty'}/>
            <br/>
            <br/> */}
            <h1 className={styles.section_text}>Recent Logs</h1>
            <h4 className={styles.section_subtext}>at a glance</h4>
            {
                  logMap?
                <>
                {logMap.map((data, index)=>( 
                <>
                {index <6? <LogItem action={data.action} by={data.createdBy} key={index} date={data.id}/> : null}
                </>
                ))}
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

export default DashBoard