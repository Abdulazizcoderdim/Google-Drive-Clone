import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLICK_FIREBASE_API_KEY,
  authDomain: 'drive-87d82.firebaseapp.com',
  projectId: 'drive-87d82',
  storageBucket: 'drive-87d82.appspot.com',
  messagingSenderId: '6088705963',
  appId: '1:6088705963:web:f145b3123f570e180d74ee',
}

!getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export { db, storage }
