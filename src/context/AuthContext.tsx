// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { authService } from '../services/authService';
import { User } from '../types/User';

type AuthContextData = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        try {
          // mapeia usuário sem pedir senha
          const mapped = await authService.mapFromFirebaseUser(fbUser);
          setUser(mapped);
        } catch (err) {
          console.log('[AuthContext] Erro ao mapear usuário logado', err);
          const fallbackName =
            fbUser.displayName ||
            (fbUser.email ? fbUser.email.split('@')[0] : 'Colaborador SkillBoost');
          setUser({
            id: fbUser.uid,
            name: fallbackName,
            email: fbUser.email ?? '',
          });
        }
      } else {
        setUser(null);
      }
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const loggedUser = await authService.login(email, password);
      setUser(loggedUser);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const newUser = await authService.register(name, email, password);
      setUser(newUser);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  if (initializing) {
    return null; // poderia ter um Splash
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
};
