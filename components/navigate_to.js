import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/folder.module.css'

const NavigateTo = ({to}) => {

    return(
        <div className={styles.container}> 
                <Link href={to}>
                    <span>
                    <Image src={'/instance.png'}  width={90} height={90}/>
                    <h3 className={styles.text}>{to}</h3> 
                    </span>
                </Link>
                
           
        </div>
    )
}

export default NavigateTo