import Image from "next/image"
import styles from '../styles/folder.module.css'
const Folder = ({name}) => {
  return(  
  <div className={styles.container}>
        <Image src={'/folder.png'} width={90} height={90}/>
        <h3 className={styles.text}>{name}</h3>
    </div>)
}
export default Folder