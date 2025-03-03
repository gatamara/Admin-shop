import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.actions';

export const getProductsActions = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await tesloApi.get<Product[]>(
      `/products?limit=${limit}&offset=${(page -1)* limit }`,
    );

    return data.map((product) => {
      //para regresar un nuevo arreglo
      return {
        ...product, //esparso el producto
        images: product.images.map(getProductImageAction), //paso la imagen por la funcion y la mandamos por referencia
      };
    });
  } catch (error) {
    console.log(error);

    throw new Error('Error getting productos');
  }
};
