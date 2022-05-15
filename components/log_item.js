import styles from '../styles/log_item.module.css'

const LogItem = ({by,date,time,action}) => {
    return(
    <div className={styles.container}>
        <h4 className={styles.main_text}>{action}</h4>
        <h5 className={styles.sub_text}>{by}, {date} at {time}</h5>
    </div>)
}

export default LogItem