import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAkAAdmzwb2vNx9tsU7jfy2R28oCHgNYn4',
  authDomain: 'cos30043-da9de.firebaseapp.com',
  databaseURL: 'https://cos30043-da9de-default-rtdb.firebaseio.com',
  projectId: 'cos30043-da9de',
  storageBucket: 'cos30043-da9de.appspot.com',
  messagingSenderId: '895227815578',
  appId: '1:895227815578:web:2cdc97d05d80651048a123',
  measurementId: 'G-TCD9Z252Z3'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)
export { app as firebaseApp, db, auth, storage }
