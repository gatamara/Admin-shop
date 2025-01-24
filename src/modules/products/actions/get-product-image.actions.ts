export const getProductImageAction = (imageName: string): string => {
  return imageName.includes('http') //si incluye el http, entonces no necesito hacer nada mas
    ? imageName //regresamos directamente el imageName
    : `${import.meta.env.VITE_TESLO_API_URL}/files/product/${imageName}`; //sino reconstruimos
};

//esta es la funcion que ncesito llamar para reconstruir la url de la imagen
