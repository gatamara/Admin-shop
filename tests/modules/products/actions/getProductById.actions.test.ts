import { getProductById, getProductsActions } from "@/modules/products/actions";




describe('getProductById', () => {

  test('should return empty product on create argument', async () => {
    const product = await getProductById('create');

   expect(product).toEqual({
    id: '',
    title: '',
    slug: '',
    description: '',
    price: 0,
    stock: 0,
    images: [],
    tags: [],
    sizes: [],
    gender: 'kid',
    user: { id: '', email: '', fullName: '', isActive: false, roles: [] }
   })
  });

  //si un producto existe, regresamos el producto
  test('should return a product if ID is found', async()=>{
    const products = await getProductsActions()

    const product = await getProductById(products[0].id) //traemos el primer producto

    expect(product).toEqual(products.at(0))

  })

  test('should throw an error if product is not found', async()=>{

    try {
      await getProductById('id-no-exists')
      expect(true).toBe(false)
    } catch (error:any) {
      expect(error.message).toBe('Error getting product by id id-no-exists')
    }
  })



})
