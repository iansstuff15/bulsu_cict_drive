import Link from "next/link"
import Layout from "../../components/layout"
import Folder from "../../components/folder"
import styles from '../../styles/drive.module.css'
import AddFileModal from "../../components/add_file_modal"
import { useState, useEffect } from "react"

import {  ref, listAll } from "firebase/storage";

import { storage } from "../../firebase"
const Files = () => {

    const [openModal, setOpenModal] = useState(false)

    useEffect(
        ()=>{
            // const listRef = ref(storage, 'files');

        },[]
    )

    return(
        <Layout>

                <div className={styles.header}>
                <Link href={'/drive/level'}>
                         <strong  className={styles.link}>/Level</strong>
                </Link>
                <Link href={'/drive/phase'}>
                        <strong  className={styles.link}>/Phase</strong>
                </Link>
                <Link href={'/drive/areas'}>
                        <strong  className={styles.link}>/Areas</strong> 
                </Link>
                <Link href={'/drive/files'}>
                         <strong className={styles.link_current}>/Files</strong> 
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

                <Folder name={'level 1'}/>
                <Folder name={'level 1'}/>
                <Folder name={'level 1'}/>
                <Folder name={'level 1'}/>
                <Folder name={'level 1'}/>
                <Folder name={'level 1'}/>
        </Layout>
    )
}

export default Files