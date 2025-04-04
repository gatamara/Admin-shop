import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { AuthStatus } from '../interfaces';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  await authStore.checkAuthStatus(); //esperamos que se haga esta verificacion
  //asi ya sabremos si esta autenticado o no
  if (authStore.authStatus === AuthStatus.Unauthenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
};

export default isAuthenticatedGuard;
