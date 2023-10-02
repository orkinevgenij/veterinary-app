import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { CategoryUpdateForm } from '../../components/Form/CategoryUpdateForm';
import { Loader } from '../../components/Loader';
import { ModalComponent } from '../../components/ModalComponent';
import {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useRemoveCategoryMutation,
  useUpdateCategoryMutation,
} from '../../redux/slices/categoryApiSlice';
import { setOpenModal } from '../../redux/slices/modalSlice';
const rowNames = ['Название', 'Действие'];
const formSchema = Yup.object({
  name: Yup.string().required('Введите название категории'),
});

export const CreateCategory = () => {
  const { isModalOpen } = useSelector((state) => state.modal);
  console.log('🚀 ~ CreateCategory ~ open:', open);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const { data: category = [], isLoading } = useGetAllCategoryQuery();
  const [createCategory, { isLoading: createLoading }] = useCreateCategoryMutation();
  const [removeCategory] = useRemoveCategoryMutation();
  const [updateCategory, { isLoading: updateLoading }] = useUpdateCategoryMutation();
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values) => {
      try {
        await createCategory(values).unwrap();
      } catch (error) {
        console.log('🚀 ~ onSubmit: ~ error:', error);
      }
    },
    validationSchema: formSchema,
  });

  const handleRemoveCategory = async (cid) => {
    try {
      await removeCategory(cid).unwrap();
    } catch (error) {
      console.log('🚀 ~ handleRemoveCategory ~ error:', error);
    }
  };
  const handleUpdate = async (name, cid) => {
    try {
      await updateCategory({ name, cid }).unwrap();
      dispatch(setOpenModal(!isModalOpen));
    } catch (error) {
      console.log('🚀 ~ handleUpdate ~ error:', error);
    }
  };
  if (isLoading) return <Loader />;

  return (
    <Grid>
      <Typography variant='body1' color='success.main'>
        Додати категорію товара
      </Typography>
      <Box
        onSubmit={formik.handleSubmit}
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <TextField
          placeholder='Название'
          value={formik.values.name}
          onChange={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          margin='normal'
        />
        <Box>
          <Button type='submit' variant='contained' color='success'>
            {createLoading ? 'Сохранение...' : 'Добавить'}
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label='simple table' minWidth='200px'>
          <TableHead>
            <TableRow>
              {rowNames.map((name, i) => (
                <TableCell
                  key={i}
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'success.main',
                  }}
                >
                  {name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {category.map((c) => (
              <TableRow key={c._id}>
                <TableCell align='center'>{c.name}</TableCell>
                <TableCell align='center'>
                  <IconButton
                    color='success'
                    title='Удалить'
                    onClick={() => {
                      handleRemoveCategory(c._id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color='success'
                    title='Редактировать'
                    onClick={() => {
                      dispatch(setOpenModal(!isModalOpen));
                      setSelectedCategory(c);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalComponent>
        <CategoryUpdateForm
          selectedCategory={selectedCategory}
          handleUpdate={handleUpdate}
          updateLoading={updateLoading}
        />
      </ModalComponent>
    </Grid>
  );
};
