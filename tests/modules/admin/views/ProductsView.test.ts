import ProductsView from "@/modules/admin/views/ProductsView.vue"
import { useQuery, useQueryClient } from "@tanstack/vue-query"
import { shallowMount } from "@vue/test-utils"
import type { Mock } from "vitest"
import { fakeProducts } from "../../../fake/products.fake"
import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: ProductsView
    }
  ]
})

//tenemos que hacer un mock de toda la implementacion de tansctack/vue-query
vi.mock('@tanstack/vue-query', () => {
  return {
    useQueryClient: vi.fn().mockReturnValue({
      prefetchQuery: vi.fn(),
    }),
    useQuery: vi.fn(),
  } }
)


describe('<ProductsView />', () => {

  (useQuery as Mock).mockReturnValue({
    data:fakeProducts
  })

  window.scrollTo = vi.fn()

  const wrapper = shallowMount(ProductsView, {
    global: {
      plugins: [ router] ,
    }
  })


  test('should render with default values', async () => {


    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should prefetch query on mounted', async () => {

    await router.replace('/?page=2')

  //  expect(useQueryClient().refetchQueries).toHaveBeenCalledWith({
  //   queryKey: ['products', { page: 3}],
  //   queryFn: expect.any(Function),
  //  })


    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })


  })




})
