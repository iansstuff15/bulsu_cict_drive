import Layout from "../../components/layout"
import Link from "next/link"
import Folder from "../../components/folder"
import styles from '../../styles/drive.module.css'

const Areas = () => {

    return(
        <Layout>

                <div className={styles.header}>
                <Link href={'/drive/level'} className={styles.link}>
                         <strong>/Level</strong>
                </Link>
                <Link href={'/drive/phase'} className={styles.link}>
                        <strong>/Phase</strong>
                </Link>
                <Link href={'/drive/areas'}>
                        <strong  className={styles.link_current}>/Areas</strong> 
                </Link>
                <strong className={styles.add_file} >
                    Add File
                </strong>

                <hr/>
                </div>
                


                <Folder name={'level 1'}/>
                <Folder name={'level 1'}/>
                <Folder name={'level 1'}/>
                <Folder name={'level 1'}/>
                <Folder name={'level 1'}/>
                <Folder name={'level 1'}/>
        </Layout>
    )
}

export default Areas