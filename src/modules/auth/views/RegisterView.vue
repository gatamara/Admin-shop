<template>
  <h1 class="text-2xl font-semibold mb-4">Nueca cuenta</h1>
  <form action="#" method="POST">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Nombre</label>
      <input type="text" id="name" name="name"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>

    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Correo</label>
      <input type="email" id="email" name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input type="password" id="password" name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>

    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">¿Olvido la contraseña?</a>
    </div>
    <!-- Login Button -->
    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
      Crear cuenta
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Ingresar aqui</RouterLink>
  </div>
</template>
