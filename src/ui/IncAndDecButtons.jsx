import React from 'react';
import Button from './Button';

import { useDispatch } from 'react-redux';
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from '../features/cart/cartSlice';

export default function IncAndDecButtons({ quantity, pizzaId }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        type="rounded"
      >
        -
      </Button>
      <p>{quantity}</p>
      <Button
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        type="rounded"
      >
        +
      </Button>
    </div>
  );
}
