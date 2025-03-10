import { getProductImageAction } from "@/modules/products/actions"


describe('getProductImageAction', () => {

  test('should return proper image URL',()=>{
    const imageName='test.jpg' // nombre de la imagen, no tiene que ser real
    const url= getProductImageAction(imageName)
    const expectedUrl = `${import.meta.env.VITE_TESLO_API_URL}/files/product/${imageName}`//la url esperada

    expect(url).toBe(expectedUrl) //nuestra url tiene que ser igual a la esperada
  })

 })
