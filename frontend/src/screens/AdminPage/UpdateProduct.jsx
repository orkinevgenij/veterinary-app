import { Box, Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useGetAllCategoryQuery } from '../../redux/slices/categoryApiSlice';
import {
  useRemoveProductMutation,
  useUpdateProductMutation,
} from '../../redux/slices/productsApiSlice';
const formSchema = Yup.object({
  title: Yup.string().required('Введіть назву товару'),
  description: Yup.string().required('Додайте информацію о товарі'),
  price: Yup.string().required('Введіть ціну товару'),
  category: Yup.string().required('Виберіть категорію'),
});
export const UpdateProduct = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data: category = [] } = useGetAllCategoryQuery();
  const [handleUpdate, { isLoading }] = useUpdateProductMutation();
  const [productRemove] = useRemoveProductMutation();

  const [preview, setPreview] = useState('');
  const formik = useFormik({
    initialValues: {
      title: state?.p.title,
      description: state?.p.description,
      price: state?.p.price,
      category: state?.p.category._id,
      image: state?.p.image,
    },
    onSubmit: async (values) => {
      console.log({ ...values, image: preview, _id: pid });
      await handleUpdate({
        title: values.title,
        description: values.description,
        price: values.price,
        category: values.category,
        image: preview,
        _id: pid,
      }).unwrap();
      navigate('/admin/all-products');
    },
    validationSchema: formSchema,
  });

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
    } else {
      setPreview('');
    }
  };

  const handleRemove = async () => {
    try {
      await productRemove(pid);
      navigate('/admin/all-products');
    } catch (error) {
      console.log('🚀 ~ handleRemove ~ error:', error);
    }
  };
  return (
    <Stack
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'center',
        mt: 5,
        ml: 5,
        mb: 5,
      }}
    >
      <Typography variant='h6' color='success.main'>
        Обновить товар
      </Typography>
      <Stack
        component='form'
        onSubmit={formik.handleSubmit}
        sx={{
          width: 'max-content',
        }}
      >
        <TextField
          type='file'
          accept='image/'
          onChange={handleProductImageUpload}
          sx={{
            mb: 3,
          }}
        />
        <Typography variant='subtitle2' color='#9C27B0'>
          {formik.touched.image && formik.errors.image}
        </Typography>
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          {preview ? (
            <img src={preview} width='200px' height='200px' />
          ) : (
            <img src={state?.p?.image?.url} width='200px' height='200px' />
          )}
        </Box>
        <TextField
          placeholder='Назва'
          value={formik.values.title}
          onChange={formik.handleChange('title')}
          onBlur={formik.handleBlur('title')}
          margin='normal'
          fullWidth
        />
        <Typography variant='subtitle2' color='#9C27B0'>
          {formik.touched.title && formik.errors.title}
        </Typography>
        <TextField
          placeholder='Опис товару'
          value={formik.values.description}
          onChange={formik.handleChange('description')}
          onBlur={formik.handleBlur('description')}
          margin='normal'
          fullWidth
        />
        <Typography variant='subtitle2' color='#9C27B0'>
          {formik.touched.description && formik.errors.description}
        </Typography>
        <TextField
          placeholder='Ціна'
          value={formik.values.price}
          onChange={formik.handleChange('price')}
          onBlur={formik.handleBlur('price')}
          margin='normal'
          fullWidth
        />
        <Typography variant='subtitle2' color='#9C27B0'>
          {formik.touched.price && formik.errors.price}
        </Typography>
        <TextField
          onChange={formik.handleChange('category')}
          onBlur={formik.handleBlur('category')}
          value={formik.values.category}
          select
          label='Категория товара'
          margin='dense'
          fullWidth
        >
          {category.map((c, index) => (
            <MenuItem key={index} value={c._id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>
        <Stack>
          <Button
            type='submit'
            variant='contained'
            color='success'
            sx={{
              display: 'block',
              mb: 2,
            }}
          >
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='success'
            sx={{
              display: 'block',
            }}
            onClick={handleRemove}
          >
            Удалить
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
