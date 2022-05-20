import Image from "next/image"
import { useSnapshot } from "valtio"
import Folder from "../components/folder"
import Layout from "../components/layout"
import LogItem from "../components/log_item"
import NavigateTo from "../components/navigate_to"
import styles from '../styles/dashboard.module.css'
import { state } from "../state/state";
const DashBoard = () => {

    const snapshot = useSnapshot(state)

    return(
        <Layout>
            <div className={styles.welcome}>
           
            <br/>
            <strong className={styles.welcome_text}>Welcome Back, {snapshot.firstName}! 👋</strong>
         
            <br/>
            <hr className={styles.horizontal_line}/>
            </div>
            <h1 className={styles.section_text}>Places</h1>
            <h4 className={styles.section_subtext}>to navigate</h4>
            <NavigateTo to={'/drive/level'}/>
            <NavigateTo to={'/drive/phase'}/>
            <NavigateTo to={'/drive/areas'}/>
            <NavigateTo to={'/drive/files'}/>
            <br/>
            <br/>


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