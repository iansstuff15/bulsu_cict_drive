import Link from "next/link"
import styles from '../styles/header.module.css'
const Header = () => {


    return(
        <div className={styles.container}>
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
        </div>
    )
}

export default Header