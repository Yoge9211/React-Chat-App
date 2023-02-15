import React, { useState } from 'react'
import './register.scss'
import { Link, useNavigate } from 'react-router-dom'
import { CiImageOn } from 'react-icons/ci'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, storage, db } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

const Register = () => {
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      //Create a unique image name
      const date = new Date().getTime()
      const storageRef = ref(storage, `${displayName + date}`)

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            //create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })

            //create empty user chats on firestore
            await setDoc(doc(db, 'userChats', res.user.uid), {})
            navigate('/')
          } catch (err) {
            console.log(err)
            setErr(true)
            setLoading(false)
          }
        })
      })
    } catch (error) {
      console.log(error.message)
      setErr(true)
    }
  }
  return (
    <div className="registerForm">
      <div className="registerFormContainer">
        <span className="heading">React-Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Your Name" />
          <input type="email" placeholder="Enter Email" />
          <input type="password" placeholder="Enter Password" />
          <input style={{ display: 'none' }} type="file" id="file" />
          <label htmlFor="file">
            <CiImageOn style={{ width: 30, height: 30 }} />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {loading && 'Uploading and compressing the image please wait...'}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
