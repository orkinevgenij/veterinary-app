import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/img/logo.png';
import { logout } from '../redux/slices/authSlice';
const objNav = [
  { nav: '/', title: 'Головна' },
  { nav: '/doctors', title: 'Лікарі' },
  { nav: '/services', title: 'Послуги' },
  { nav: '/about', title: 'Про нас' },
  { nav: '/contacts', title: 'Контакти' },
  { nav: '/shop/category', title: 'Зоомагазин' },
  { nav: '/apointment', title: 'Записатися' },
];

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElCategory, setAnchorElCategory] = useState(null);
  const { userInfo } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenCategoryMenu = (event) => {
    setAnchorElCategory(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseCategoryMenu = (event) => {
    setAnchorElCategory(null);
  };
  const logoutHandler = async () => {
    handleCloseUserMenu();
    try {
      dispatch(logout());
      navigate('/');
      handleCloseUserMenu();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <AppBar position='static' color='success'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Typography
              variant='h6'
              noWrap
              component={Link}
              to='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex', alignItems: 'center' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src={Logo} alt='' height={40} width={40} />
              ZOO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {objNav.map((obj, index) => (
                  <MenuItem
                    key={index}
                    component={Link}
                    to={obj.nav}
                    sx={{
                      textDecoration: 'none',
                      color: '#000',
                    }}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign='center'>{obj.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant='h5'
              noWrap
              component={Link}
              to='/'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none', alignItems: 'center' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src={Logo} alt='' height={40} width={40} />
              ZOO
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex', alignItems: 'center' },
              }}
            >
              {objNav.map((obj, index) => (
                <>
                  <Divider orientation='vertical' flexItem />
                  <Button
                    disableRipple
                    component={Link}
                    to={obj.nav}
                    onClick={handleCloseNavMenu}
                    sx={{
                      color: 'white',
                      '&:last-child': {
                        backgroundColor: 'warning.main',
                        ml: 3,
                      },
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    <Typography>{obj.title}</Typography>
                  </Button>
                </>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip>
                {userInfo ? (
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: '#fff' }}>
                    <Typography>{userInfo?.name}</Typography>
                    <ArrowDropDownIcon />
                  </IconButton>
                ) : (
                  <Button
                    component={Link}
                    to='/login'
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <Typography>Увійти</Typography>
                  </Button>
                )}
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={handleCloseUserMenu}
                  component={Link}
                  to='/profile'
                  sx={{
                    textDecoration: 'none',
                    color: '#000',
                  }}
                >
                  <Typography>Профіль</Typography>
                </MenuItem>
                {userInfo?.isAdmin && (
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to='admin/clientlist'
                    sx={{
                      textDecoration: 'none',
                      color: '#000',
                    }}
                  >
                    <Typography>Управління</Typography>
                  </MenuItem>
                )}
                {!userInfo?.isAdmin && (
                  <MenuItem
                    onClick={() => handleCloseUserMenu()}
                    component={Link}
                    to='user-orders'
                    sx={{
                      textDecoration: 'none',
                      color: '#000',
                    }}
                  >
                    <Typography>Мои заказы</Typography>
                  </MenuItem>
                )}

                <MenuItem
                  onClick={logoutHandler}
                  sx={{
                    textDecoration: 'none',
                    color: '#000',
                  }}
                >
                  <Typography>Вийти</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};
