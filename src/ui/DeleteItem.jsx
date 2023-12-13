import React from 'react';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { deleteCart } from '../features/cart/cartSlice';

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button onClick={() => dispatch(deleteCart(pizzaId))} type="small">
      Delete
    </Button>
  );
}
