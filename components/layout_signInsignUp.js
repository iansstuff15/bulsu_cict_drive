import Header from "./header";
import styles from '../styles/layout.module.css'
const Layout = ({children}) => (
    < >
         <Header/>
        <div className={styles.container }>
      
            {
                children
            }
            {/* <div >
                 Side something
            </div> */}
        </div>
    </>
)

export default Layout