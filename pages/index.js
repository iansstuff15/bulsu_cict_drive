import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import InputComponent from '../components/input'
import Layout from '../components/layout_signInsignUp'
import styles from '../styles/form.module.css'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useSnapshot } from 'valtio'
import { state } from "../state/state";



export default function Home() {
  const router = useRouter()

  const snapshot = useSnapshot(state)

  const [email,setEmail] = useState()
  const [password, setPassword] = useState()

  const SignIn = async(e) => {
    e.preventDefault()
        toast.loading('Signing you in')
        const body = {
            email: email,
            password:password,
        }

        await fetch('../api/firebase_signin',{
            method:'POST',  
            body: JSON.stringify(body)
          }).then(response => response.json()).then(
            data => {
            console.log(data)
            console.log(data.data + 'data')
            
            state.uid = data.data._document.data.value.mapValue.fields.uid.stringValue
            state.firstName = data.data._document.data.value.mapValue.fields.firstName.stringValue
            state.lastName = data.data._document.data.value.mapValue.fields.lastName.stringValue
            state.role = data.data._document.data.value.mapValue.fields.role.stringValue
            state.email = data.data._document.data.value.mapValue.fields.email.stringValue
           state.location = data.data._document.data.value.mapValue.fields.location.stringValue
           state.phone = data.data._document.data.value.mapValue.fields.phone.stringValue
            // state.uid = data.data._document.data.value.mapValue.fields.uid.stringValue,
            // state.firstName = data.data._document.data.value.mapValue.fields.firstName.stringValue,
            // state.lastName = data.data._document.data.value.mapValue.fields.lastName.stringValue,
            // // state.email = data.data.email,
            // // state.phone = data.data.phone,
            // // state.image = data.data.image,
            // state.role = data.data._document.data.value.mapValue.fields.role.stringValue,
            // console.log(data.data.lastName + state.lastName+'first name')
            console.log(state)
          })

        toast.success('Sign-in success logging you in')
        router.push('/dashboard')
  }

  return (
    <Layout>
      
      <h1 className={styles.section_title}>Sign In</h1>
      <h3 className={styles.section_subtitle}>to BULSUCICT Drive</h3>

      <form onSubmit={SignIn}>

      <InputComponent label={'Email'} name={'email'} placeholder={'juandelacruz@email.com'} type={'email'} onChange={(e)=>setEmail(e.target.value)}/>
      <InputComponent label={'Password'} name={'password'} placeholder={'JuanD#123'} type={'password'} onChange={(e)=>setPassword(e.target.value)}/>
      <input type={'submit'}   className={styles.button_signin} value="Sign-in"/>

      </form>


      {/* <Link href={'/signup'}>
          <h3 className={styles.alternate_option}>
              Dont have an account yet? sign up here!
          </h3>
      </Link> */}
      <ToastContainer theme="colored" position="bottom-right" autoClose={800}/>
    </Layout>
  )
}
