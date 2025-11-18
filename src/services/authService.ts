// src/services/authService.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { User } from '../types/User';

console.log('FIREBASE OPTIONS', auth.app.options);

const mapFirebaseUser = async (fbUser: FirebaseUser): Promise<User> => {
  const userRef = doc(db, 'users', fbUser.uid);
  const snapshot = await getDoc(userRef);

  let name =
    snapshot.exists() && snapshot.data().name
      ? (snapshot.data().name as string)
      : fbUser.displayName ||
        fbUser.email?.split('@')[0] ||
        'Colaborador SkillBoost';

  return {
    id: fbUser.uid,
    name,
    email: fbUser.email ?? '',
  };
};

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const fbUser = credential.user;
    return mapFirebaseUser(fbUser);
  },

  async register(name: string, email: string, password: string): Promise<User> {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const fbUser = credential.user;

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    }

    const userRef = doc(db, 'users', fbUser.uid);
    await setDoc(
      userRef,
      {
        name,
        email,
      },
      { merge: true },
    );

    return mapFirebaseUser(fbUser);
  },

  async logout(): Promise<void> {
    await firebaseSignOut(auth);
  },
};
