import Link from "next/link"
import Layout from "../../../../../components/layout"
import Folder from "../../../../../components/folder"
import styles from '../../../../../styles/drive.module.css'
import AddFileModal from "../../../../../components/add_file_modal"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import {  ref, listAll } from "firebase/storage";

import { storage } from "../../../../../firebase"
const Files = () => {

    const [openModal, setOpenModal] = useState(false)
    const router = useRouter()
    const { levelid } = router.query
    const { phaseid } = router.query
    const {areaid} = router.query
    useEffect(
        ()=>{
            // const listRef = ref(storage, 'files');

        },[]
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
                        <strong  className={styles.link_current}>/{phaseid}</strong> 
                </Link>
                <Link href={`/drive/${levelid}/${phaseid}/${areaid}`}>
                         <strong className={styles.link_current}>/{areaid}</strong> 
                </Link>
                <strong className={styles.add_file} onClick={()=>{
                    if(openModal){
                        setOpenModal(false)
                    }
                    else{

                        setOpenModal(true)
                    }
                   }}>
                    Add File
                </strong>
                <hr/>
                
                </div>
{
    openModal?
                <AddFileModal/>
   :
   null            
}

               
        </Layout>
    )
}

export default Files