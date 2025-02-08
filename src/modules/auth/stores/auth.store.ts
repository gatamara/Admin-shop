import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces';
import { loginAction, registerAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';
import { checkAuthAction } from '../actions/check-auth.action';

export const useAuthStore = defineStore('auth', () => {
  //Authenticated, unAuthenticated, Checking - son los tres estados que tendre en mi autenticacion
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', '')); //dejamos el token en el localstorage

  const login = async (email: string, password: string) => {
    try {
      const loginResp = await loginAction(email, password);
      if (!loginResp.ok) {
        logout();
        return false;
      }

      user.value = loginResp.user;
      token.value = loginResp.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.log(error);
      logout();
    }
  };

  //funcion que limpia el store
  const logout = () => {
    localStorage.removeItem('token');
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = '';
    console.log('usuario cerrado');

    return false;
  };

  const register = async (fullname: string, email: string, password: string) => {
    try {
      const registerResp = await registerAction(fullname, email, password);
      if (!registerResp.ok) {
        logout();
        return false;
      }
      user.value = registerResp.user;
      token.value = registerResp.token;
      authStatus.value = AuthStatus.Authenticated;

      return { ok: true, message: '' };
    } catch (error) {
      console.log(error);
      return { ok: false, message: 'error al registrar el usuario' };
    }
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction();

      if (!statusResp.ok) {
        logout();
        return false;
      }
      authStatus.value = AuthStatus.Authenticated;
      user.value = statusResp.user;
      token.value = statusResp.token;
      return true;
    } catch (error) {
      logout();
      console.log(error);

      return false;
    }
  };

  return {
    //state
    user,
    token,
    authStatus,

    //Getters - booleanos
    isCheking: computed(() => authStatus.value === AuthStatus.Checking), //esto va a devolver un true
    isAutenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),
    username: computed(() => user.value?.fullName), //saber el nombre del usuario

    //acciones
    logout,
    login,
    register,
    checkAuthStatus,
  };
});
