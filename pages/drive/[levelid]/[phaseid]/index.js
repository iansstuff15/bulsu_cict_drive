import Layout from "../../../../components/layout"
import Link from "next/link"
import Folder from "../../../../components/folder"
import styles from '../../../../styles/drive.module.css'
import { useState,useEffect } from "react"
import InputComponent from "../../../../components/input"
import { useSnapshot } from "valtio"
import { useRouter } from "next/router"
import { state } from "../../../../state/state"
import { AddArea,db } from "../../../../firebase"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection,getDocs } from "firebase/firestore"
const Areas = () => {
    const snapshot = useSnapshot(state)
    const [addingFolder,setAddingFolder] = useState(false)
    const router = useRouter()
    const { levelid } = router.query
    const { phaseid } = router.query

    const [name,setName] = useState('New File')
    const [filesMap, setFilesMap] = useState([])
    const now = new Date()

    const createArea = () => {
        const body = {
            name: name,
            createdBy: snapshot.userName,
            creatorUID: snapshot.uid,
            creatorRegisteredName: `${snapshot.lastName}, ${snapshot.firstName}`,
            dateTimeCreated: now,
            action: `Added area: ${name}`,
            date: `${now.getFullYear()}, ${now.toLocaleString('default', { month: 'long' })} ${now.getDate()}`,
        }
        AddArea(levelid,body,phaseid,name)

        toast.success(`Area ${name} successfully added`)
    }
    useEffect(()=>{
        const logsCollection = collection(db,'files',levelid,'phases',phaseid,'areas')
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
                <Link href={'/drive'} className={styles.link}>
                         <strong>/drive</strong>
                </Link>
                <Link href={`/drive/${levelid}`} className={styles.link}>
                        <strong>/{levelid}</strong>
                </Link>
                <Link href={`/drive/${levelid}/${phaseid}`}>
                        <strong  className={styles.link_current}>/{phaseid  }</strong> 
                </Link>
                {addingFolder?
            <strong className={styles.add_file} onClick={()=>setAddingFolder(false)}>
            Cancel
            </strong>
            :
                <strong className={styles.add_file}  onClick={()=>setAddingFolder(true)}>
                    Add Area
                    
                </strong>}
                {
                    addingFolder?
                    <>
                        <br/>
                        <InputComponent type={'text'} label={'Area Name'} placeholder={'i.e. Area 1'} onChange={(e)=>setName(e.target.value)}/>
                        <br/>
                        <strong className={styles.send} onClick={()=>{

                            createArea()
                            setAddingFolder(false)}}>
                        Save
                        </strong>
                       
                    </>
                    :
                    null
                }

                        <br/>
                        <br/>
                        <hr/>
                </div>
                
                {filesMap.map((data,index)=>(<Folder key={index} name={data.name} link={`/drive/${levelid}/${phaseid}/${data.id}`}/>))}


                <ToastContainer theme="colored" position="bottom-right" autoClose={800}/>
        </Layout>
    )
}

export default Areas