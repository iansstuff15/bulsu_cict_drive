import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from '../styles/header.module.css'
const Header = () => {
    
    const router = useRouter(   )
    const pathname = router.pathname
    return(
        <div className={styles.container}>
          
            <Image src={'/LOGO.png'} width={90} height={70} className={styles.logo}/>
         { 
         pathname == '/' ?
         null:
         
         <span className={styles.nav_container}>
           <Link href={'/dashboard'}>
                <strong className={styles.link}>
                   Dashboard
                   </strong>
            </Link>
           <Link href={'/logs'} >
               <strong className={styles.link}>
               Logs
                </strong>
            </Link>
           <Link href={'/profile'} >
                <strong className={styles.link}>
                    Profile
                </strong>
            </Link>
           </span>
             
        }
          
        </div>
    )
}

export default Header