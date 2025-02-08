<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useAuthStore } from './modules/auth/stores/auth.store';
import { AuthStatus } from './modules/auth/interfaces';
import { useRoute, useRouter } from 'vue-router';
import FullScreenLoader from './modules/shop/components/FullScreenLoader.vue';
const authStore = useAuthStore()

const router = useRouter() //permite manejar la navegacion, historial, etc
const route = useRoute()  //informacion de la ruta

authStore.$subscribe((_, state) => {

  if (state.authStatus === AuthStatus.Checking) {
    authStore.checkAuthStatus()
    return
  }
  if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
    router.replace({ name: 'home' })
  }
  if (state.authStatus === AuthStatus.Unauthenticated) {
    router.replace({ name: 'login' })
  }

}, { immediate: true }//qque se ejecute tan pronto sea montado
)
</script>

<template>
  <FullScreenLoader v-if="authStore.isCheking" />
  <RouterView v-else />
  <VueQueryDevtools />

</template>
