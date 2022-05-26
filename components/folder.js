import Image from "next/image"
import Link from "next/link"
import styles from '../styles/folder.module.css'
const Folder = ({name,link}) => {
  return(  
  <Link href={link}>
   <div className={styles.container}>
        <Image src={'/folder.png'} width={90} height={90}/>
        <h3 className={styles.text}>{name}</h3>
    </div>
  </Link>
 )
}
export default Folder