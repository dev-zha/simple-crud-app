import { LS_AUTH_USER } from '@/constants';
import { AuthUser } from '@/types';

export const getAuthToken = (): string | null => {
  const value = window.localStorage.getItem(LS_AUTH_USER);
  if (value) {
    const user = JSON.parse(value) as AuthUser;
    return user.token;
  }
  return null;
};
