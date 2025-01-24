<script setup lang="ts">
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue';
interface Props {
  page: number;
  hasMoreData: boolean;
}
defineProps<Props>();
</script>

<template>
  <div class="flex justify-center py-10 bg-gray-100 space-x-3">
    <button :disabled="page === 1" @click="$router.push({ query: { page: page - 1 } })" class="btn-pagination">
      <ArrowLeftIcon />
      <span>Anteriores</span>

    </button>
    <button :disabled="hasMoreData" @click="$router.push({ query: { page: page + 1 } })" class="btn-pagination">
      <span>Siguientes</span>
      <ArrowRightIcon />
    </button>
  </div>
</template>

<style scoped>
.btn-pagination {
  @apply flex items-center space-x-1.5 rounded-lg px-4 py-1.5 bg-blue-500 hover:bg-blue-700 text-white disabled:bg-gray-300 transition-all
}
</style>
