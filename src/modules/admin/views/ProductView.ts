import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';
import { getProductById } from '@/modules/products/actions';
import { useQuery } from '@tanstack/vue-query';
import { useFieldArray, useForm } from 'vee-validate';

import { defineComponent, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';

const validationSchema = yup.object({
  title: yup.string().required().min(2, 'Minimo de 2 letras'),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().min(1).required(),
  gender: yup.string().required().oneOf(['men', 'women', 'kid']),
});

export default defineComponent({
  components: {
    CustomInput,
    CustomTextArea,
  },
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

    const { values, errors, defineField, handleSubmit, resetForm, meta } = useForm({
      validationSchema,
      //  initialValues: product.value,
    });

    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');

    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');
    const { fields: images } = useFieldArray<string>('images'); // un arreglo de string

    const onSubmit = handleSubmit((value) => {
      console.log({ value });
    });

    const toggleSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value);
      const hasSize = currentSizes.includes(size);

      if (hasSize) {
        removeSize(currentSizes.indexOf(size));
      } else {
        pushSize(size);
      }
    };

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        //si hay un error y no estamos cargando
        router.replace('/admin/products'); //sacamos a la persona y la mandamos a la pantalla products
        return;
      }
    });
    watch(
      product,
      () => {
        if (!product) return;
        resetForm({
          values: product.value,
        });
      },
      {
        deep: true, //que este pendiente de las propiedades internas del objeto, pendiente de los objetos anidados
        immediate: true, //que la cargue apenas se monte el componente
      },
    );

    return {
      //Properties
      values,
      errors,
      meta,

      title,
      titleAttrs,
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
      images,
      sizes,

      //getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //actions
      onSubmit,
      toggleSize,

      hasSize: (size: string) => {
        const currentSizes = sizes.value.map((s) => s.value);
        return currentSizes.includes(size);
      },
    };
  },
});
