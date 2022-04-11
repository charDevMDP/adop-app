// configuracion para Firebase

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORA_BUCKET,
    MESSAGE_SENDER_ID,
    APP_ID
} from '@env'

const firebaseConfig = {

    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORA_BUCKET,
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID

};


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

export { app, db, storage, auth }

