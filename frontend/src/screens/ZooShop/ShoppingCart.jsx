import { Close } from '@mui/icons-material';
import { Box, Button, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartEmpty } from '../../components/CartEmpty';
import CartItems from '../../components/CartItems';
import { clearCart } from '../../redux/slices/cartSlice';
import { useCreateOrderMutation } from '../../redux/slices/orderApiSlice';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import currencyFormatter from '../../utils/currencyFormatter';
export const ShoppingCart = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const { userInfo } = useSelector((state) => state?.auth);
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createOrder] = useCreateOrderMutation();

  const handleCreateOrder = async () => {
    await createOrder({ cartItems });
    setIsDrawerOpen(false);
    navigate(userInfo ? 'user-orders' : 'login');
  };

  return (
    <>
      <Drawer anchor='right' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        {cartItems.length > 0 && (
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={() => {
                if (window.confirm('Вы действительно хотите удалить?')) dispatch(clearCart());
              }}
              endIcon={<DeleteOutlineIcon />}
              size='small'
              sx={{
                color: 'grey.500',
                mt: 1,
              }}
            >
              Очистити кошик
            </Button>
          </Stack>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
          }}
        >
          <Typography sx={{ flexGrow: 1 }} variant='caption' color='grey.600'>
            {cartItems.length > 0 && `Товарів в кошику: ${cartItems.length}`}
          </Typography>
          <Box>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </Box>
        <Divider />

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
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid',
                borderColor: 'success.main',
                padding: 2,
                borderRadius: '5px',
                backgroundColor: 'success.light',
              }}
            >
              {totalPrice > 0 && (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 3,
                    }}
                  >
                    <Typography variant='h5'>Разом</Typography>
                    <Typography
                      sx={{
                        fontWeight: '600',
                      }}
                    >
                      {currencyFormatter(totalPrice)}
                    </Typography>
                  </Box>
                  <Button variant='contained' color='success' onClick={handleCreateOrder}>
                    Оформить заказ
                  </Button>
                </>
              )}
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};
