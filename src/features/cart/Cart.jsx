import React from 'react';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

export default function Cart() {
  const { fullName } = useSelector((store) => store.user);
  const cart = useSelector(getCart);
 

  const dispatch = useDispatch();

  const handleClickClear = (e) => {
    e.preventDefault();
    dispatch(clearCart());
  };
  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to Menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Your card, {fullName}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-4">
        <Button type="primary" to="/order/new">
          Order Pizza
        </Button>
        <Button onClick={handleClickClear} type="secondary">
          Clear Cart
        </Button>
      </div>
    </div>
  );
}
