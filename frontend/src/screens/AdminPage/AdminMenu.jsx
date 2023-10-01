import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Drawer as MUIDrawer, List, Typography, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenDrawer } from '../../redux/slices/modalSlice';
const routes = [
  { name: 'Клиенты', path: 'clientlist', icon: <PeopleIcon /> },
  {
    name: 'Прийоми',
    path: 'apointments',
    icon: <LocalHospitalIcon />,
  },
  {
    name: 'Статистика',
    path: 'statistics',
    icon: <DonutSmallIcon />,
  },
  {
    name: 'Завершені прийоми',
    path: 'success-apointments',
    icon: <ShoppingCartIcon />,
  },
  {
    name: 'Додати товар',
    path: 'create-product',
    icon: <AddIcon />,
  },
  {
    name: 'Усі товари',
    path: 'all-products',
    icon: <CategoryIcon />,
  },
  {
    name: 'Додати користувачая',
    path: 'create-user',
    icon: <EditIcon />,
  },
  {
    name: 'Додати категорію',
    path: 'create-category',
    icon: <CategoryIcon />,
  },
  {
    name: 'Усі замовлення',
    path: 'orders',
    icon: <ShoppingCartIcon />,
  },
];
const AdminMenu = () => {
  const { isDrawerOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        mr: 5,
      }}
    >
      <List>
        {routes.map((route) => (
          <>
            <Link to={route.path} onClick={() => dispatch(setOpenDrawer(!isDrawerOpen))}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <Typography variant='caption'>{route.name}</Typography>
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );
};

export default AdminMenu;
