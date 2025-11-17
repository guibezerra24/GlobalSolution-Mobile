// src/types/User.ts

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};
