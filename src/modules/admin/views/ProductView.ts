import { getProductById } from '@/modules/products/actions';
import { useQuery } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { defineComponent, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';

const validationSchema = yup.object({
  tittle: yup.string().required(),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().min(1).required(),
  geder: yup.string().required().oneOf(['men', 'women', 'kid']),
});

export default defineComponent({
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    //no se ocupa el defineProps(), ua que solo funciona en el script setup
    //por eso se definen de manera tradicional en Vue, como props:{}
    //cuando se carga el componente necesito traer la informacion del producto
    const {
      data: product,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['product', props.productId], //'product' es un nombre que asigno yo, y que tenga sentido
      queryFn: () => getProductById(props.productId), //este es el query que se va a dispara cuando se monte el componente el query cambie
      retry: false, //si falla la cantidad de reintentos
    });

    const { values, defineField, errors } = useForm({
      validationSchema,
    });

    const [tittle, tittleAttrs] = defineField('tittle');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        //si hay un error y no estamos cargando
        router.replace('/admin/products'); //sacamos a la persona y la mandamos a la pantalla products
      }
    });
    console.log(product);

    return {
      //Properties
      values,
      errors,
      tittle,
      tittleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,
      //getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //actions
    };
  },
});
