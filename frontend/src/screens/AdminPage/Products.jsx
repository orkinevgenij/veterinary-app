import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery, useRemoveProductMutation } from '../../redux/slices/productsApiSlice';

const rowNames = ['ID', 'Название', 'Цена', 'Категория', 'Действие'];

const Products = () => {
  const { data: products = [] } = useGetProductsQuery();
  const [productRemove, { isLoading }] = useRemoveProductMutation();
  const navigate = useNavigate();

  const handleRemove = async (id) => {
    try {
      await productRemove(id);
    } catch (error) {
      console.log('🚀 ~ handleRemove ~ error:', error);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
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
          {products.map((p) => (
            <TableRow
              key={p?._id}
              sx={{
                cursor: 'pointer',
              }}
              hover
            >
              <TableCell align='center'>{p?._id}</TableCell>
              <TableCell align='center'>{p?.title}</TableCell>
              <TableCell align='center'>{p?.price} грн.</TableCell>
              <TableCell align='center'>{p?.category?.name}</TableCell>
              <TableCell align='center'>
                <IconButton color='success' title='Удалить' onClick={() => handleRemove(p?._id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  color='success'
                  title='Редактировать'
                  x
                  onClick={() =>
                    navigate(`update-product/${p?._id}`, {
                      state: { p },
                    })
                  }
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Products;
