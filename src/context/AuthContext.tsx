// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { authService } from '../services/authService';
import { AuthUser, User } from '../types/User';

type AuthContextData = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

const STORAGE_KEY = '@skillboost:user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const mapUserToAuthUser = (user: User): AuthUser => ({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: AuthUser = JSON.parse(stored);
          setUser(parsed);
        }
      } catch (err) {
        console.error('Erro ao carregar usuário do armazenamento:', err);
      } finally {
        setLoading(false);
      }
    };

    void loadStoredUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const loggedUser = await authService.login(email, password);
      const safeUser = mapUserToAuthUser(loggedUser);
      setUser(safeUser);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    } catch (err: any) {
      console.error('Erro no login:', err);
      const message =
        err instanceof Error && err.message
          ? err.message
          : 'Não foi possível autenticar. Tente novamente.';
      throw new Error(message);
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Erro ao sair:', err);
      Alert.alert(
        'Erro',
        'Não foi possível finalizar a sessão corretamente. Tente novamente.',
      );
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
