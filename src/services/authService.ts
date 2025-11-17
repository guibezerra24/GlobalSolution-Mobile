// src/services/authService.ts
import api from './api';
import { User } from '../types/User';

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const response = await api.get<User[]>('/Users', {
      params: { email },
    });

    if (!response.data.length) {
      throw new Error('Usuário não encontrado. Verifique o e-mail informado.');
    }

    const user = response.data[0];

    if (user.password !== password) {
      throw new Error('Senha incorreta. Tente novamente.');
    }

    return user;
  },

  async register(name: string, email: string, password: string): Promise<User> {
   
    const existing = await api.get<User[]>('/Users', {
      params: { email },
    });

    if (existing.data.length > 0) {
      throw new Error(
        'Já existe um usuário cadastrado com esse e-mail. Tente fazer login.',
      );
    }

    // 👇
    const response = await api.post<User>('/users', {
      name,
      email,
      password,
    });

    return response.data;
  },

  async getUserById(id: string): Promise<User> {
    const response = await api.get<User>(`/Users/${id}`);
    return response.data;
  },
};
