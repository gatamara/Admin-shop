import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.actions';

export const getProductById = async (productId: string) => {
  //TODO: pensar la creacion de un nuevo producto

  try {
    const { data } = await tesloApi.get<Product>(`/products/${productId}`); //esto va a regresar la data de un producto
    console.log({ data });

    return {
      ...data, //si se encuentra el producto, un spread de la data
      images: data.images.map(getProductImageAction), //procesamos las imagenes
    };
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting product by id ${productId} `);
  }
};
