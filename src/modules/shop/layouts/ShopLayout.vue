<template>
  <!-- Header Navbar -->
  <TopMenu />



  <RouterView />

  <!-- Footer -->
  <CustomFooter />


</template>

<script setup lang="ts">

import CustomFooter from '../components/CustomFooter.vue';
import TopMenu from '../components/TopMenu.vue';


</script>

<style scoped></style>
