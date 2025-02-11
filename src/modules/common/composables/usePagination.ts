import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export const usePagination = () => {
  const route = useRoute(); //necesito saber cual es la ruta actual, quiero extraer la ruta de la URL
  const page = ref(Number(route.query.page || 1)); // la pagina necesito transformarla en un numero, para poder evaluarla

  //necesito saber cuando la ruta cambia, si cambia hay que volver a procesarla
  watch(
    () => route.query.page,
    (newPage) => {
      page.value = Number(newPage || 1);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  );
  return { page };
};
