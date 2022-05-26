import Layout from "../../components/layout"
import Link from "next/link"
import Folder from "../../components/folder"
import styles from '../../styles/drive.module.css' 
import { useState } from "react"
import InputComponent from "../../components/input"
import { AddLevel } from "../../firebase"
import { useSnapshot } from "valtio"
import { state } from "../../state/state"
import { ToastContainer, toast } from 'react-toastify';
import { collection,getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image"
import { useEffect } from "react"
const Level = () => {

    const snapshot = useSnapshot(state)
    
    const [addingFolder,setAddingFolder] = useState(false)

    const [name,setName] = useState('New File')
    const [filesMap, setFilesMap] = useState([])
    const now = new Date()
    
    const createLevel = () => {
        const body = {
            name: name,
            createdBy: snapshot.userName,
            creatorUID: snapshot.uid,
            creatorRegisteredName: `${snapshot.lastName}, ${snapshot.firstName}`,
            dateTimeCreated: now,
            action: `Added File: ${name}`,
            date: `${now.getFullYear()}, ${now.toLocaleString('default', { month: 'long' })} ${now.getDate()}`,
        }
        AddLevel(name,body)

        toast.success(`file ${name} successfully added`)
    }

    useEffect(()=>{
        const logsCollection = collection(db,'files')
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
                         <strong  className={styles.link_current}> /drive</strong>
                </Link>
            {addingFolder?
            <strong className={styles.add_file} onClick={()=>setAddingFolder(false)}>
            Cancel
            </strong>
            :
                <strong className={styles.add_file}  onClick={()=>setAddingFolder(true)}>
                    Add Level
                </strong>}
                {
                    addingFolder?
                    <>
                        <br/>
                        <InputComponent type={'text'} label={'Level Name'} placeholder={'i.e. Level 1'}  onChange={(e)=>setName(e.target.value)}/>
                        <br/>
                        <strong className={styles.send} onClick={()=>{

                            createLevel()
                            setAddingFolder(false)}}>
                        Save
                        </strong>
                        <br/>
                    </>
                    :
                    null
                }
                </div>
                <hr/>
                {
                  filesMap?
                <>
                {filesMap.map((data,index)=>(<Folder key={index} name={data.name} link={`/drive/${data.id}`}/>))}
                </>
                    
                  :
                  <h1 className={styles.empty_prompt}>
                  <Image src={'/empty_illustration.png'} width={300} height={300}/>
                  <br/>
                  Oopps this part is this empty...
  
  
                 </h1>
                }
                

                <ToastContainer theme="colored" position="bottom-right" autoClose={800}/>
        </Layout>
    )
}

export default Level