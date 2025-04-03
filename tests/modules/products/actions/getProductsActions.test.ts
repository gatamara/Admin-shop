import { getProductsActions } from "@/modules/products/actions"


describe('getProductsActions', async() => {

  const products = await getProductsActions(1,10)

    test('should return expected',async() => {

      expect(products.length).toBe(10)

      expect(products.at(0)).toEqual(
        expect.objectContaining({
      id: expect.any(String), //espera cualquier string
      title: expect.any(String),
      price: expect.any(Number),
      description: expect.any(String),
      slug: expect.any(String),
      stock: expect.any(Number),
      sizes: expect.any(Array),
      gender: expect.any(String),
      tags: expect.any(Array),
      images: expect.any(Array),
      user: {
        id: expect.any(String),
        email: expect.any(String),
        fullName: expect.any(String),
        isActive: expect.any(Boolean),
        roles: expect.any(Array),
      },
          })
        )
    })


//     test('should return expected',async() => {

//       products.forEach((product) => {
//         product.images.forEach((image) => {
//           expect(image).toContain(`${import.meta.env.VITE_TESLO_API_URL}/files/product/`)
//       })

//     })

// }
// )
})
