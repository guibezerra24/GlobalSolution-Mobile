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

const fallbackNameFromUser = (fbUser: FirebaseUser): string =>
  fbUser.displayName ||
  (fbUser.email ? fbUser.email.split('@')[0] : 'Colaborador SkillBoost');

const mapFirebaseUser = async (
  fbUser: FirebaseUser,
  displayNameOverride?: string,
): Promise<User> => {
  const userRef = doc(db, 'users', fbUser.uid);

  let snapshot: any = null;
  try {
    snapshot = await getDoc(userRef);
  } catch (err) {
    console.log('[authService] Erro ao buscar user no Firestore (ignorado)', err);
  }

  let name =
    displayNameOverride ||
    (snapshot && snapshot.exists() && snapshot.data().name) ||
    fallbackNameFromUser(fbUser);

  const email = fbUser.email ?? '';

  return {
    id: fbUser.uid,
    name,
    email,
  };
};

export const authService = {
  // usado pelo AuthContext no onAuthStateChanged
  mapFromFirebaseUser: (fbUser: FirebaseUser) => mapFirebaseUser(fbUser),

  login: async (email: string, password: string): Promise<User> => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const fbUser = credential.user;

    try {
      return await mapFirebaseUser(fbUser);
    } catch (err) {
      console.log('[authService] Erro no mapFirebaseUser durante login, usando fallback', err);
      return {
        id: fbUser.uid,
        name: fallbackNameFromUser(fbUser),
        email: fbUser.email ?? '',
      };
    }
  },

  register: async (name: string, email: string, password: string): Promise<User> => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const fbUser = credential.user;

    // Atualiza displayName no Auth
    try {
      await updateProfile(fbUser, { displayName: name });
    } catch (err) {
      console.log('[authService] Erro ao atualizar displayName', err);
    }

    // Cria/atualiza documento no Firestore
    try {
      const userRef = doc(db, 'users', fbUser.uid);
      await setDoc(
        userRef,
        { name, email },
        { merge: true },
      );
    } catch (err) {
      console.log('[authService] Erro ao salvar usuário no Firestore (ignorado)', err);
    }

    try {
      return await mapFirebaseUser(fbUser, name);
    } catch (err) {
      console.log('[authService] Erro no mapFirebaseUser durante register, usando fallback', err);
      return {
        id: fbUser.uid,
        name,
        email,
      };
    }
  },

  logout: async (): Promise<void> => {
    await firebaseSignOut(auth);
  },
};
