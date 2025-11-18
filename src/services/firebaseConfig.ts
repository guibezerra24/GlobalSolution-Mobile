// src/services/firebaseConfig.ts
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBySf2_4G3u6RAWgZj0XSXeEG1TY5Y3g88',
  authDomain: 'apilongi-app.firebaseapp.com',
  projectId: 'apilongi-app',
  storageBucket: 'apilongi-app.firebasestorage.app',
  messagingSenderId: '76940428240',
  appId: '1:76940428240:web:0a012ed5179b8d374fafd5',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
