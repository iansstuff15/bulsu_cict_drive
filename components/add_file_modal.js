import styles from '../styles/modal.module.css'
import InputComponent from './input'
import { useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase'
import { snapshot } from 'valtio'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddFileModal = ( ) => {
    const [isUploading, setIsUploading] = useState(true)
    const [fileName, setFileName] = useState('Drag or Click file here')
    const [progress, setProgress] = useState(0)
    const handleSubmit = (e) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        console.log(file.name)
        setFileName(file.name)

        uploadFile(file)
    }

    const uploadFile = (file) => {
        if(!file) return

        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef,file)

        uploadTask.on("state_changed", (snapshot)=>{
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setProgress(prog)
            
        }, (err)=>console.log(err),()=>{
            getDownloadURL(uploadTask.snapshot.ref).then(url => console.log(url))
            toast.success(`file ${file.name} has been uploaded`)
            
            setIsUploading(false)
        })
    }
  
  return( 
    <>    
       {
       isUploading?
       <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <div className={styles.inner_container}> 
                <h1>Add File</h1>
            
                    <label className={styles.label}>
                    {fileName}
                
                    <input type={'file'} className={styles.input} onChange={(e)=>{
                        const file = e.target.files[0]
                        console.log(file.name)
                        setFileName(file.name)
                    }}/>
                    </label>
                
                
                
                    <br/>
                    <progress className={styles.progress} value={progress} max="100" />
                    <h1 className={styles.outline_button} onClick={()=>{setIsUploading(false)}}>Cancel</h1>
                    <button type='submit' className={styles.button}>Upload</button>
                    
                </div>
            </form >
            <ToastContainer theme="colored" position="bottom-right"/>
        </div> : null}
    </>

    )
}

export default AddFileModal