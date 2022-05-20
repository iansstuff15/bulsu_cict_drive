import styles from '../styles/input.module.css'

const InputComponent = ({name,label,type, ...otherProps})=>(
    <div>
<h3 className={styles.label}>{label}</h3>
  <input id={name} type={type} {...otherProps} className={styles.input}/>
    </div>
)

export default InputComponent