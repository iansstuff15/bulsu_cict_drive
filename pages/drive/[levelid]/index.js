import Layout from "../../../components/layout"
import Link from "next/link"
import Folder from "../../../components/folder"
import styles from '../../../styles/drive.module.css'
import { useState,useEffect } from "react"
import InputComponent from "../../../components/input"
import { useSnapshot } from "valtio"
import { state } from "../../../state/state"
import { useRouter } from 'next/router'
import { collection,doc } from "firebase/firestore"
import { db,AddPhase } from "../../../firebase"
import { getDocs } from "firebase/firestore"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Phase = () => {
    const snapshot = useSnapshot(state)
    const [addingFolder,setAddingFolder] = useState(false)
    const router = useRouter()
    const { levelid } = router.query


    const [name,setName] = useState('New File')
    const [filesMap, setFilesMap] = useState([])
    const now = new Date()
       
    const createPhase = () => {
        const body = {
            name: name,
            createdBy: snapshot.userName,
            creatorUID: snapshot.uid,
            creatorRegisteredName: `${snapshot.lastName}, ${snapshot.firstName}`,
            dateTimeCreated: now,
            action: `Added phase: ${name}`,
            date: `${now.getFullYear()}, ${now.toLocaleString('default', { month: 'long' })} ${now.getDate()}`,
        }
        AddPhase(levelid,body,name)

        toast.success(`Phase ${name} successfully added`)
    }

    useEffect(()=>{
        const logsCollection = collection(db,'files',levelid,'phases')
        getDocs(logsCollection).then((snapshot)=>{
         
     
          let files = []
      
          snapshot.docs.forEach((doc)=>{
            files.push({
              ...doc.data(),id: doc.id
            })
          })
          console.log(files)
          console.log({...files})
          setFilesMap(files)
          
          console.log('logs map')
          console.log(filesMap)
        
        }).catch(err=>console.log(err.message))
                console.log('data')
    },
    [addingFolder]
    )

    return(
        <Layout>

                <div className={styles.header}>
                <Link href={'/drive'}>
                         <strong className={styles.link}>/drive</strong>
                </Link>
                <Link href={`/drive/${levelid}`}>
                        <strong className={styles.link_current}>/{levelid}</strong>
                </Link>
                
                {addingFolder?
            <strong className={styles.add_file} onClick={()=>setAddingFolder(false)}>
            Cancel
            
            </strong>

            :
                <>
                <strong className={styles.add_file}  onClick={()=>setAddingFolder(true)}>
                    Add Phase
                </strong>
                <hr/>
                </>
                }
                
                {
                    addingFolder?
                    <>
                        <br/>
                        <InputComponent type={'text'} label={'Phase Name'} placeholder={'i.e. Phase 1'} onChange={(e)=>setName(e.target.value)}/>
                        <br/>
                        <strong className={styles.send} onClick={()=>{

                            createPhase()
                            setAddingFolder(false)}}>
                        Save
                        </strong>
                        <br/>
                        <br/>
                        <hr/>
                    </>
                    :
                    null
                }
                
                </div>
                
                {filesMap.map((data,index)=>(<Folder key={index} name={data.name} link={`/drive/${levelid}/${data.id}`}/>))}


                <ToastContainer theme="colored" position="bottom-right" autoClose={800}/>
              
        </Layout>
    )
}

export default Phase