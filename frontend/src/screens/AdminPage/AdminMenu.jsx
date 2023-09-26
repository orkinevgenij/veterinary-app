import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

const AdminMenu = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 200, bgcolor: 'background.paper', mt: 3, mr: 3 }}>
      <nav aria-label='main mailbox folders'>
        <List>
          <Link to='clientlist'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon color='success' />
                </ListItemIcon>
                <ListItemText primary='Клиенты' />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='apointments'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LocalHospitalIcon color='success' />
                </ListItemIcon>
                <ListItemText primary='Приемы' />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='statistics'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LocalHospitalIcon color='success' />
                </ListItemIcon>
                <ListItemText primary='Статистика' />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='success-apointments'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingCartIcon color='success' />
                </ListItemIcon>
                <ListItemText primary='Завершенные приёмы' />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </nav>
      <Divider />
      <nav aria-label='secondary mailbox folders'>
        <List>
          <Link to='create-product'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon color='success' />
                </ListItemIcon>
                <ListItemText primary='Добавить товар' />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='all-products'>
            <ListItem disablePadding>
              <ListItemButton component='a'>
                <ListItemIcon>
                  <CategoryIcon color='success' />
                </ListItemIcon>
                <ListItemText primary='Все товары' />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to='create-user'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingCartIcon color='success' />
                </ListItemIcon>
                <ListItemText primary='Создать пользователя' />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to='create-category'>
            <ListItem disablePadding>
              <ListItemButton component='a' href='#simple-list'>
                <ListItemIcon>
                  <CategoryIcon color='success' />
                </ListItemIcon>
                <ListItemText primary='Создать категорию товара' />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Link to='orders'>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon color='success' />
              </ListItemIcon>
              <ListItemText primary='Заказы' />
            </ListItemButton>
          </ListItem>
        </Link>
      </nav>
    </Box>
  );
};

export default AdminMenu;
