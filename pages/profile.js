
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import Layout from "../components/layout"
import styles from '../styles/profile.module.css'

import { useSnapshot } from "valtio"
import { state } from "../state/state";
const Profile = () => {
    const snapshot = useSnapshot(state)
    const router = useRouter()

    const Signout = () => {
        router.push('/')
    }
    return(
        <Layout>
            <div className={styles.head}>

            
            <span>

            <h1 className={styles.header_text}>Good day 👋</h1>

            <div><h1 className={styles.name}>{snapshot.firstName}!</h1> <strong className={styles.role}>{snapshot.role}</strong></div>

            </span>
            <br/>
            <Link href={'/signup'}>
            <div className={styles.button_signout} onClick={()=>{Signout()}}>
                <strong>

                Create user profiles
                </strong>

            </div>
            </Link>
            
          
            <br/>
                    <br/>
        
            
        <hr className={styles.section_divider}/>
           </div>

          <div>
              
           

            </div>
      
           <div className={styles.contact_info_container}>
            <h1>About</h1>
            <hr className={styles.section_divider_in_container}/>
            <h1 className={styles.section_header}>Contact Information </h1>
            <h3 className={styles.section_content}><strong>Email:</strong> <br/> {snapshot.email}</h3>
            <h3 className={styles.section_content}><strong>Phone:</strong><br/> {snapshot.phone}</h3>
     
            <h1 className={styles.section_header}><strong>Location Information</strong> </h1>
            <h3 className={styles.section_content}><strong>Location:</strong><br/>{snapshot.location}</h3>
            </div>

            <br/>
            <div className={styles.button_signout} onClick={()=>{Signout()}}>
                <strong>

                Sign out
                </strong>

            </div>
           
        </Layout>
    )
}

export default Profile

