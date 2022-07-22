
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCVQcDprAJ5aN3KKmvdRL_xNw6wSpG2uNQ',
  authDomain: 'donation-management-f564a.firebaseapp.com',
  projectId: 'donation-management-f564a',
  storageBucket: 'donation-management-f564a.appspot.com',
  messagingSenderId: '147248109523',
  appId: '1:147248109523:web:8c68024cbaeb8281e1c126',
  measurementId: 'G-D9DYBF2TG2'
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export{
    storage
}