import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD7hptuuqkALcLw6VBulkKaem5qauHwJj8',
  authDomain: 'react-chat-app-d0613.firebaseapp.com',
  projectId: 'react-chat-app-d0613',
  storageBucket: 'react-chat-app-d0613.appspot.com',
  messagingSenderId: '1061685347275',
  appId: '1:1061685347275:web:06b89779f9389876856c4e',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
