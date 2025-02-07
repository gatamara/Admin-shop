import { tesloApi } from '@/api/tesloApi';
import { isAxiosError } from 'axios';
import type { User } from '../interfaces';

interface RegisterError {
  ok: false;
  message: string;
}
interface RegisterSucces {
  ok: true;
  user: User;
  token: string;
}

export const registerAction = async (
  fullname: string,
  email: string,
  password: string,
): Promise<RegisterSucces | RegisterError> => {
  try {
    const { data } = await tesloApi.post('/auth/register', {
      fullname,
      email,
      password,
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
    throw new Error('No se pudo crear el usuario');
  }
};
