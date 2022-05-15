import Link from "next/link"

const Header = () => {


    return(
        <div>
           <Link href={'/dashboard'}>Dashboard</Link>
           <Link href={'/logs'}>Logs</Link>
           <Link href={'/profile'}>Profile</Link>
        </div>
    )
}

export default Header