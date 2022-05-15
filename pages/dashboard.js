import Image from "next/image"
import Folder from "../components/folder"
import Layout from "../components/layout"
import LogItem from "../components/log_item"
import styles from '../styles/dashboard.module.css'
const DashBoard = () => {

    return(
        <Layout>
            <div className={styles.welcome}>
           
            <br/>
            <strong className={styles.welcome_text}>Welcome Back, Dirian! 👋</strong>
         
            <br/>
            <hr className={styles.horizontal_line}/>
            </div>
            <h1 className={styles.section_text}>Areas</h1>
            <h4 className={styles.section_subtext}>at a glance</h4>
            <Folder name={'Faculty'}/>
            <Folder name={'Faculty'}/>
            <Folder name={'Faculty'}/>
            <Folder name={'Faculty'}/>
            <Folder name={'Faculty'}/>
            <Folder name={'Faculty'}/>
            <Folder name={'Faculty'}/>
            <br/>
            <br/>
            <h1 className={styles.section_text}>Recent Logs</h1>
            <h4 className={styles.section_subtext}>at a glance</h4>
            <LogItem action={'Added a file name sample.docx'} by={'Juan D'} date={'May 15, 2022'} time={'7:15 p.m.' }/>
            <LogItem action={'Added a file name sample.docx'} by={'Juan D'} date={'May 15, 2022'} time={'7:15 p.m.' }/>
            <LogItem action={'Added a file name sample.docx'} by={'Juan D'} date={'May 15, 2022'} time={'7:15 p.m.' }/>
            <LogItem action={'Added a file name sample.docx'} by={'Juan D'} date={'May 15, 2022'} time={'7:15 p.m.' }/>
            <LogItem action={'Added a file name sample.docx'} by={'Juan D'} date={'May 15, 2022'} time={'7:15 p.m.' }/>
        </Layout>
    )
}

export default DashBoard