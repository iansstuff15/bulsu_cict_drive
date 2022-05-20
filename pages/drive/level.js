import Layout from "../../components/layout"
import Link from "next/link"
import Folder from "../../components/folder"
import styles from '../../styles/drive.module.css'
const Level = () => {

    return(
        <Layout>
                <div className={styles.header}>
                <Link href={'/drive/level'}>
                         <strong  className={styles.link_current}> /Level</strong>
                </Link>

                <strong className={styles.add_file} >
                    Add File
                </strong>
               
                </div>
                <hr/>
                <Folder name={'level 1'}/>
                <Folder name={'level 1'}/>
                <Folder name={'level 1'}/>
                <Folder name={'level 1'}/>
                <Folder name={'level 1'}/>
                <Folder name={'level 1'}/>
        </Layout>
    )
}

export default Level