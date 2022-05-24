import Layout from "../components/layout_signInsignUp"
import styles from '../styles/form.module.css'
import { useRouter } from 'next/router'
import { useState } from "react";
import Link from 'next/link'
import InputComponent from '../components/input'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";

import {AiOutlineCheckCircle,AiFillCheckCircle} from 'react-icons/ai'

const Signup = () => {

    const router = useRouter()

    

    const [email,setEmail] = useState()
    const [password, setPassword] = useState()
    const [userName,setUserName] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName,setLastName] = useState()
    const [location, setLocation] = useState()
    const [phone,setPhone] = useState()


    const [isUppercase, setIsUppercase] = useState(false)
    const [isLowercase, setIsLowercase] = useState(false)
    const [isContainDigit, setIsContainDigit] = useState(false)
    const [isContainSymbol, setIsContainSymbol] = useState(false)
    const [isNotShort, setIsNotShort] = useState(false)
    const [isValidating, setIsValidating] = useState(false)
    

    const [role, setRole] = useState('administrator')
    const [step,setStep] = useState(1)

    const SignUp = async(e) => {
        e.preventDefault()
        
        const body = {
            email: email,
            password:password,
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            role: role,
            phone: phone,
            location: location
        }

        await fetch('../api/firebase_register',{
            method:'POST',  
            body: JSON.stringify(body)
          }).then(response => response.json()).then(
            data=>{
              console.log(data)
              if(data.status == 'success'){
                toast.success(`Sign-up success with ${email}`)

              }
              else{
                toast.error(data.status.code)
              }
            }
          )
          
       
        
    }
    return(
        <Layout>
            
            <form onSubmit={SignUp}> 
            
            <h1 className={styles.section_title}>Sign Up</h1>
            <h3 className={styles.section_subtitle}>to BULSUCICT Drive</h3>
            
            <div>
                <h1>Choose a Role</h1>
                <span className={ styles.image_container}>
                <h3>Faculty</h3>
                <Image src={'/role_faculty.png'} className={role == 'faculty'? styles.selected_role :  styles.unselected_role} quality={100} width={200} height={300}  objectFit="cover" onClick={()=>{
                    if(role == 'faculty'){
                        setRole('')

                    }
                    else{
                        setRole('faculty')
                    }
                    }} />
                </span>
                <span className={styles.image_container}>
                <h3>Accreditor</h3>
                <Image src={'/role_accreditor.png'} quality={100} width={200} height={300} className={role == 'accreditor'? styles.selected_role  : styles.unselected_role} objectFit="cover" onClick={()=>{
                    if(role == 'accreditor'){
                        setRole('')

                    }
                    else{
                        setRole('accreditor')
                    }
                    }}/>
                </span>
            </div>
            <InputComponent label={'User Name'} name={'userName'} placeholder={'JuanD'} type={'text'} onChange={(e)=>setUserName(e.target.value)}/>
            <InputComponent label={'First Name'} name={'firstName'} placeholder={'Juan'} type={'text'} onChange={(e)=>setFirstName(e.target.value)}/>
            <InputComponent label={'Last Name'} name={'lastName'} placeholder={'Dela cruz'} type={'text'} onChange={(e)=>setLastName(e.target.value)}/>
            <InputComponent label={'Location'} name={'location'} placeholder={'Somewhere city'} type={'text'} onChange={(e)=>setLocation(e.target.value)}/>
            <InputComponent label={'Phone'} name={'phone'} placeholder={'091234556'} type={'number'} onChange={(e)=>setPhone(e.target.value)}/>
            <InputComponent label={'Email'} name={'email'} placeholder={'juandelacruz@email.com'} type={'email'} onChange={(e)=>setEmail(e.target.value)}/>
            <InputComponent label={'Password'} name={'password'} placeholder={'JuanD#123'} type={'password'}  onFocus={()=>{setIsValidating(true)}} onBlur={()=>{setIsValidating(false)}}  onChange={(e) => {
          setPassword(e.target.value)
          if(password.length >= 8){
            setIsNotShort(true)
          }
          else if(password.length < 8){
            setIsNotShort(false)
          }
          if(e.target.value.match(/[A-Z]/)){
            setIsUppercase(true)
          }
          else{
            setIsUppercase(false)
          }
         
          if(e.target.value.match(/[a-z]/)){
            setIsLowercase(true)
          }
          else{
            setIsLowercase(false)
          }
          if(e.target.value.match(/[0-9]/)){
            setIsContainDigit(true)
          }
          else{
            setIsContainDigit(false)
          }
          if(e.target.value.match(/[\?\=\.\*\!\@\#\$\%\^\&\*\_\=\+\-]/)){
            setIsContainSymbol(true)
            }
            else{
              setIsContainSymbol(false)
            }


        }
          
      } />
            { isValidating?
      <>
      <div>
         {isUppercase? <AiFillCheckCircle size={20}/> : <AiOutlineCheckCircle size={20}/> }
         contains uppercase letter
       </div>

       <div>
         {isLowercase? <AiFillCheckCircle size={20}/> : <AiOutlineCheckCircle size={20}/> }
         contains lowercase letter
       </div>
       <div>
         {isContainDigit? <AiFillCheckCircle size={20}/> : <AiOutlineCheckCircle size={20}/> }
         contains a digit
       </div>
       <div>
         {isContainSymbol? <AiFillCheckCircle size={20}/> : <AiOutlineCheckCircle size={20}/> }
         contains a symbol
       </div>
       <div>
         {isNotShort? <AiFillCheckCircle size={20}/> : <AiOutlineCheckCircle size={20}/> }
         is 8 characters longer
       </div>
       </>
       : null
}
<br/>
            <input type={'submit'}  className={styles.button_signin} value="Sign-up"/>
            </form>
            {/* <Link href={'/'}>
            <h3 className={styles.alternate_option}>
                Already have an account? sign in here!
            </h3>
            </Link> */}
            <ToastContainer theme="colored" position="bottom-right" autoClose={800}/>
        </Layout>
    )
}

export default Signup