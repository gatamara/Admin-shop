import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';
import { createUpdateProductAction, getProductById } from '@/modules/products/actions';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useFieldArray, useForm } from 'vee-validate';

import { defineComponent, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
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
    const toast = useToast();
    const {
      data: product,
      isError,
      isLoading,
      refetch,//es para volver a ejecutar la funcion que se paso en el queryFn
    } = useQuery({
      queryKey: ['product', props.productId], //'product' es un nombre que asigno yo, y que tenga sentido
      queryFn: () => getProductById(props.productId), //este es el query que se va a dispara cuando se monte el componente el query cambie
      retry: false, //si falla la cantidad de reintentos
    });

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSucces,
      data: updatedProduct,
    } = useMutation({
      //isSuccess:isUpdateSucces, data:updatedProduct los estoy renonbrando con :
      mutationFn: createUpdateProductAction, //es la referencia a la funcion
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
    const imageFiles=ref<File[]>([]); //un arreglo de archivos

    const onSubmit = handleSubmit((values) => {
      const formValues = {
        ...values,
        images: [...values.images, ...imageFiles.value],
        //http://localhost:3000/api/products/1
        //File

      };
      mutate(formValues);
    });
    //handleSubmit es propio de useForm, el cual se encarga que todos los valores del formulario sean validos
    //y si lo son, ejecuta la funcion que le pasamos como argumento

    const toggleSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value);
      const hasSize = currentSizes.includes(size);

      if (hasSize) {
        removeSize(currentSizes.indexOf(size));
      } else {
        pushSize(size);
      }
    };

    const onFilesChange=(event:Event)=>{
      const fileInput = event.target as HTMLInputElement;
      const fileList=fileInput.files

      if(!fileList) return;
      if(fileList.length===0) return;

      for(const imageFile of fileList){
        imageFiles.value.push(imageFile);
      }

    }

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
    watch(isUpdateSucces, (value) => {
      if (!value) return; //si no se actualiza con exito no hago nada

      toast.success('Producto actualizado con exito');
      router.replace(`/admin/products/${updatedProduct.value?.id}`); //redirigimos a la pantalla de productos

      resetForm({
        values: updatedProduct.value,
      }); //resstablecer los valores del formulario
    });

    watch(()=>props.productId,()=>{ //cuando cambie el id del producto})
      refetch(); //vuelvo a cargar la informacion del producto
    })


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
      imageFiles,

      isPending,

      //getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //actions
      onSubmit,
      toggleSize,
      onFilesChange,

      hasSize: (size: string) => {
        const currentSizes = sizes.value.map((s) => s.value);
        return currentSizes.includes(size);
      },
      temporalImageUrl:(imageFile:File)=>{
        return URL.createObjectURL(imageFile);

      }
    };
  },
});
