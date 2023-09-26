import { Close } from '@mui/icons-material';
import { Box, Button, Divider, Drawer, IconButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartEmpty } from '../../components/CartEmpty';
import CartItems from '../../components/CartItems';
import { clearCart } from '../../redux/slices/cartSlice';
import { useCreateOrderMutation } from '../../redux/slices/orderApiSlice';
import currencyFormatter from '../../utils/currencyFormatter';
export const ShoppingCart = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const { userInfo } = useSelector((state) => state?.auth);
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createOrder] = useCreateOrderMutation();

  const handleCreateOrder = async () => {
    await createOrder({ cartItems });
    dispatch(clearCart());
    setIsDrawerOpen(false);
    navigate(userInfo ? 'order' : 'login');
  };

  return (
    <>
      <Drawer anchor='right' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
          }}
        >
          <Typography sx={{ flexGrow: 1 }} variant='body2'>
            {cartItems.length > 0 && `Товарів в кошику: ${cartItems.length}`}
          </Typography>
          <Box>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </Box>
        <Box p={2} maxWidth='400px' role='presentation'>
          {cartItems.length <= 0 ? (
            <CartEmpty />
          ) : (
            cartItems.map((p) => (
              <>
                <CartItems products={p} />
                <Divider
                  sx={{
                    marginBottom: '20px',
                  }}
                />
              </>
            ))
          )}
          {totalPrice > 0 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant='h5' color='gray'>
                Всього:
              </Typography>
              <Typography
                sx={{
                  fontWeight: '900',
                }}
              >
                {currencyFormatter(totalPrice)}
              </Typography>
            </Box>
          )}
          {cartItems.length <= 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                variant='contained'
                color='success'
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigate('shop/category');
                }}
              >
                До покупок
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button variant='contained' color='success' onClick={handleCreateOrder}>
                Оформить заказ
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};
