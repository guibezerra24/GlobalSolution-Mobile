// src/services/authService.ts
import api from './api';
import { User } from '../types/User';

export const authService = {
  async login(email: string, password: string): Promise<User> {
    // ATENÇÃO: "Users" com U maiúsculo, igual ao MockAPI
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

  async getUserById(id: string): Promise<User> {
    // ATENÇÃO: "Users" com U maiúsculo aqui também
    const response = await api.get<User>(`/Users/${id}`);
    return response.data;
  },
};
