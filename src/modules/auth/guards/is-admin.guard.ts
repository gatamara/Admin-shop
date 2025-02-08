import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const isAdminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  await authStore.checkAuthStatus(); //esperamos que se haga esta verificacion
  //asi ya sabremos si esta autenticado o no
  if (authStore.isAdmin) {
    next();
  } else {
    next({ name: 'home' });
  }
};

export default isAdminGuard;
