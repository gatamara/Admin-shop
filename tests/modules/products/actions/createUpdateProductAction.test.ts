// import path from "path";
// import fs from "fs";

// import { tesloApi } from "@/api/tesloApi";
// import { loginAction } from "@/modules/auth/actions";
// import { createUpdateProductAction } from "@/modules/products/actions";
// import type { Product } from "@/modules/products/interfaces/product.interface";



// describe('createUpdateProductAction', () => {

  // //para hacer las pruebas necesitamos un token en localStorage antes de dispara la accion
  // //beforeAll se ejecuta antes de todas las pruebas
  // beforeAll(async() => {
  //   const resp= await loginAction('test1@google.com','Abc123')
  //   if (!resp.ok) { //si la respuesta no es ok
  //     throw new Error('Failed to login');
  //   }

  //   localStorage.setItem('token', resp.token);
  // });

  // test('should create a new product', async () => {

  //   const product:Product= {
  //     id: '',
  //     title: 'Product title 3',
  //     price:100,
  //     description: 'Test Product description',
  //     slug: 'test-title-3',
  //     stock: 10,
  //     sizes: [],
  //     images: [],
  //     gender:'kid',
  //     tags:[],
  //     user: {} as any,

  //   }
  //   const resp = await createUpdateProductAction(product);

  //   await tesloApi.delete(`/products/${resp.id}`);    //borramos el producto creado

  //   expect(resp).toEqual({
  //     description: "Test Product description",
  //       gender: "kid",
  //       id: expect.any(String),
  //       images:  [],
  //       price: 100,
  //       sizes:  [],
  //       slug: "test-title-3",
  //       stock: 10,
  //       tags:  [],
  //       title: "Product title 3",
  //       user: {
  //         email: "test1@google.com",
  //         fullName: "Test One",
  //         id: expect.any(String),
  //         isActive: true,
  //         roles: expect.any(Array), //espere cualquer arreglo
  //       },
  //   });
  // });


  // test('should update a product', async () => {

  //   const products =await tesloApi.get<Product[]>('/products');
  //   const product=products.data[0];
  //   const productId = product.id; // necesitamos el id del producto

  //   const updatedProduct= {
  //     ...product, //esparcimos el producto
  //     title: 'Updated title', //actualizamos el titulo
  //     description: 'Updated description', //actualizamos la descripcion
  //     stock:10, //actualizamos el stock
  //   }

  //   const resp= await createUpdateProductAction(updatedProduct); //mandamos la actualizacion
  //   console.log(resp)

  //   expect(resp).toEqual(
  //     expect.objectContaining({
  //       ...product,
  //       id: productId,
  //       title: 'Updated title',
  //       description: 'Updated description',
  //       stock:10,
  //     })
  //   )

  // //   expect(resp).toEqual({
  // //     id: productId,
  // // title: 'Updated title',
  // // price: 45,
  // // description: 'Updated description',
  // // slug: 'men_turbine_long_sleeve_tee',
  // // stock: 10,
  // // sizes: [ 'XS', 'S', 'M', 'L' ],
  // // gender: 'men',
  // // tags: [ 'shirt' ],
  // // user:expect.any(Object),
  // // images: [ '1740280-00-A_0_2000.jpg', '1740280-00-A_1.jpg' ]
  // // })

  // })

  // test('should upload product image',async ()=> { //prueba para subir una imagen

  //   console.log(__dirname); //ruta del archivo, me dice cual es el path del archivo

  //   const imagepath = path.join(__dirname,'../../../fake','t-shirt.jpg'); //ruta de la imagen
  //   console.log({imagepath})
  //   const imageBuffer = fs.readFileSync(imagepath)
  //   const imageFile = new File([imageBuffer],'t-shirt.jpg',{type:'image/jpeg'}) //creamos un archivo




  //   const product:Product= {
  //     id: '',
  //     title: 'Product title 3',
  //     price:100,
  //     description: 'Test Product description',
  //     slug: 'test-title-3',
  //     stock: 10,
  //     sizes: [],
  //     images: [imageFile] as any,
  //     gender:'kid',
  //     tags:[],
  //     user: {} as any,

  //   }
  //   const {images, id} = await createUpdateProductAction(product);
  //   const [img1]=images; //sacamos la primera imagen


  //   expect(typeof img1).toBe('string'); //esperamos que la imagen sea 1

  //   await tesloApi.delete(`/products/${id}`);    //borramos el producto creado

  // }
// )

// });
