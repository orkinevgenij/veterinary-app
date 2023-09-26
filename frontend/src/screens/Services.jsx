import React from 'react';
import {
  TableContainer,
  TableBody,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Paper,
} from '@mui/material';
import tableData from '../data/tableData';

export const Services = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: 3,
      }}
    >
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                color: 'success.main',
              }}
            >
              Назва послуги
            </TableCell>
            <TableCell
              align='center'
              sx={{
                color: 'success.main',
              }}
            >
              ціна, грн
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row?.name}</TableCell>
              <TableCell align='center'>{row?.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
