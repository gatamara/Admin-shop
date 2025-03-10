import { tesloApi } from "@/api/tesloApi";


describe('Teslo API axio instance', () => {

  test('should have baseURL set to VITE_TESLO_API_URL', () => {

    expect(tesloApi.defaults.baseURL).toBe(import.meta.env.VITE_TESLO_API_URL);

    //expect(tesloApi.defaults.baseURL).toBe('https://vue-nest-teslo-ts.up.railway.app/api');
    // es una prueba para asegurarnos que nuestra isntancia de axios va a tener el valor de baseURL basado en la variable de entorno
  });

  test('should set Autorization header with token from localstorage', async() => {

    const token='myAuthToken'
    localStorage.setItem('token', token);

    const resp=await tesloApi.get('/test');

    expect(resp.config.headers.Authorization).toBe(`Bearer ${token}`);

  });

  test('should not set Autorization header if token is not in localstorage', async() => {
     //si no existe el token en el localstorage no se debe de enviar el  `Bearer ${token}`

    localStorage.clear();// nos aseguramos que no exista nada en el localstorage

    const resp=await tesloApi.get('/test');

    expect(resp.config.headers.Authorization).toBeUndefined(); //verifico que no este definido

  });

});
