import axios from 'axios';

const tesloApi = axios.create({
  baseURL: import.meta.env.VITE_TESLO_API_URL,
});

//interceptors
tesloApi.interceptors.request.use((config) => {
  // aqui va la configuracion
  const token = localStorage.getItem('token'); //trae el token del localstorage
  if (token) {
    //si existe
    config.headers.Authorization = `Bearer ${token}`; //si hay un token lo pone en la autorizacion
  }
  return config;
});

export { tesloApi };
//autenticacion y autorizacion no son lo mismo
//autenticacion es poder identificar un usuario
//autorizacion es poder saber si un usuario tiene acceso a algo
