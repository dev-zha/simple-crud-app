import { AuthUser } from '@/types';
import api from './axiosInstance';

interface AuthUserWithPass extends Omit<AuthUser, 'id' | 'token'> {
  password: string;
}

export const login = async (
  credentials: Omit<AuthUserWithPass, 'username'>
) => {
  return await api.post('/auth/login', credentials);
};

export const register = async (credentials: AuthUserWithPass) => {
  return await api.post('/auth/register', credentials);
};
