import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart } from '../redux/slices/cartSlice';
import { createOrder } from '../redux/slices/orderSlice';
import { Box, Typography, Button, List, ListItem, CircularProgress, Alert } from '@mui/material';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    const total = items.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);
    const order = {
      items: items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      total,
    };
    dispatch(createOrder(order));
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Panier</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {items.length === 0 ? (
        <Typography>Le panier est vide</Typography>
      ) : (
        <>
          <List>
            {items.map((item) => (
              <ListItem key={item.productId._id}>
                <Typography>
                  {item.productId.name} - {item.quantity} x ${item.productId.price}
                </Typography>
                <Button onClick={() => handleRemove(item.productId._id)} color="error">
                  Supprimer
                </Button>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">
            Total: ${items.reduce((sum, item) => sum + item.quantity * item.productId.price, 0)}
          </Typography>
          <Button
            variant="contained"
            onClick={handleCheckout}
            disabled={items.length === 0}
            sx={{ mt: 2 }}
          >
            Passer au paiement
          </Button>
        </>
      )}
    </Box>
  );
};

export default Cart;