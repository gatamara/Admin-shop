import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';

export const createUpdateProductAction = async (product: Partial<Product>) => {
  const productId=product.id;
  product = cleanProductForCreateUpdate(product);
  if (product.id && product.id !== '') {
    //actualizar producto

    return await updateProduct(productId!, product);
  }
  //crear producto
  return await createProduct(product);
};

const cleanProductForCreateUpdate = (product: Partial<Product>) => {
  const images: string[] =
    product.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop();
        return imageName ? image : '';
      }
      return image;
    }) ?? [];

  delete product.id; //en la actualizacion no se espera que se mande el id en el objeto que se manda por seguridad
  delete product.user; //va en el token
  product.images = images;

  return product;
}

const updateProduct = async ( productId:string, product: Partial<Product>) => {


  try {
    const { data } = await tesloApi.patch<Product>(`/products/${productId}`, product);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error updating product');
  }
};

//const createUpdateProduct = async ( product:Partial<Product>)
//voy a recibir como argumento, algo que luce como un Producto, o un Producto
//si creo uno nuevo, va a LUCIR como un Producto, pero no tendra el id, ni el usuario que lo ha  creado
//y no puedo tiparlo solo como <Product>, por que me obliga a que tega id y User que aun no tenemos
// por eso con typescript le digo con Partial, que todas las propiedades de Product son opciones

const createProduct = async (product: Partial<Product>) => {


  try {
    const { data } = await tesloApi.post<Product>(`/products`, product);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating product');
  }
};
