import { Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useCreateProductMutation } from '../../redux/slices/productsApiSlice';
import { useGetAllCategoryQuery } from '../../redux/slices/categoryApiSlice';

const formSchema = Yup.object({
  title: Yup.string().required('Введіть назву товару'),
  description: Yup.string().required('Додайте информацію о товарі'),
  price: Yup.string().required('Введіть ціну товару'),
  category: Yup.string().required('Виберіть категорію'),
  // image: Yup.mixed().required('Виберіть зображення'),
});

export const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data: category = [] } = useGetAllCategoryQuery();

  const [preview, setPreview] = useState('');
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      image: '',
    },
    onSubmit: async (values, { resetForm }) => {
      console.log({ ...values, image: preview });
      await createProduct({ ...values, image: preview }).unwrap();
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

  return (
    <Stack component='form' onSubmit={formik.handleSubmit} width='100vw'>
      <Paper
        component={Stack}
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          padding: '20px',
          width: '50%',
          height: 'max-content',
          margin: '20px auto',
        }}
      >
        <Typography variant='h6' color='success.main'>
          Додати товар
        </Typography>
        <TextField type='file' accept='image/' onChange={handleProductImageUpload} />
        <Typography variant='subtitle2' color='#9C27B0'>
          {formik.touched.image && formik.errors.image}
        </Typography>
        {preview ? <img src={preview} width='200px' height='200px' /> : null}
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
        <Stack
          sx={{
            display: 'flex',
          }}
        >
          <Button
            type='submit'
            variant='contained'
            color='success'
            sx={{
              display: 'block',
            }}
          >
            Додати
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};
