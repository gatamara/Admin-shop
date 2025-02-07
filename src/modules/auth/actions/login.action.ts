import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse, User } from '../interfaces';
import { isAxiosError } from 'axios';

interface LoginError {
  ok: false;
  message: string;
}
interface LoginSucces {
  ok: true;
  user: User;
  token: string;
}

export const loginAction = async (
  email: string,
  password: string,
): Promise<LoginError | LoginSucces> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
      email, //esta es la data que le mando al backend
      password, //esta es la data que le mando al backend
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    //hay dos tipos de errores, controlados y no controlados
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          ok: false,
          message: 'Usuario o contrasena incorrectos',
        };
      }
    }
    throw new Error('No se pudo realizar la peticion');
  }
};
