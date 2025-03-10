import ShopLayout from "@/modules/shop/layouts/ShopLayout.vue";
import { shallowMount } from "@vue/test-utils";


describe( '<ShopLayout/>', () => {
  test( 'render top menu, router view and footer', () => {

  const wrapper = shallowMount(ShopLayout, //shallowMount por que no quiero renderizar los componentes hijos, solo comprobar que existen
   { global:{stubs:['RouterView']} }) //hay que proveer el stubs para que no de error al no encontrar el router-view ya que no se esta importando ni renderizando en el test

    console.log(wrapper.html());

    expect(wrapper.findComponent({name:'TopMenu'}).exists()).toBe(true);
    expect(wrapper.findComponent({name:'CustomFooter'}).exists()).toBe(true);
    expect(wrapper.findComponent({name:'RouterView'}).exists()).toBe(true);
  })
})
