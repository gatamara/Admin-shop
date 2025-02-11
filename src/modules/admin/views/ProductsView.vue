<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">Productos</h1>

    <div class=" py-8 w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-10 text-left py-3 px-4 uppercase font-semibold text-sm">Imagen</th>
              <th class="flex-1 text-left py-3 px-4 uppercase font-semibold text-sm">Titulo</th>
              <th class="w-28 py-3 px-4 uppercase font-semibold text-sm">Precio</th>
              <th class="w-60 text-left py-3 px-4 uppercase font-semibold text-sm">Tallas</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-for="(product, index) in products" :key="product.id" :class="{
              'bg-gray-100': index % 2 === 0
            }">
              <td class="text-left py-3 px-4">
                <img :src="product.images[0]" :alt="product.title" class="h-10 w-10 object-cover" />
              </td>
              <td class=" text-left py-3 px-4">
                <RouterLink :to="`admin/products/${product.id}`" class="hover:text-blue-500 hover:underline">{{
                  product.title }} </RouterLink>
              </td>
              <td class="text-left py-3 px-4"> <span class="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">
                  {{ product.price }}</span> </td>
              <td class="text-left py-3 px-4">
                {{ product.sizes.join(',') }}
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      <ButtonPagination :page="page" :has-more-data="!!products && products.length > 10" />
    </div>
  </div>

</template>



<script setup lang="ts">
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import { usePagination } from '@/modules/common/composables/usePagination';
import { getProductsActions } from '@/modules/products/actions';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { watchEffect } from 'vue';



const queryClient = useQueryClient()

const { page } = usePagination()

const { data: products = [] } = useQuery({  //estoy renombrando la data, como products
  queryKey: ['products', { page: page }], //crea una lave, un identificador unico
  queryFn: () => getProductsActions(page.value), //dependiendo de la pagina, es lo que se carga
})

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProductsActions(page.value + 1),
  })
})
</script>

<style scoped></style>
