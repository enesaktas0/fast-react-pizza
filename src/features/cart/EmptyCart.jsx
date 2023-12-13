import React from 'react';
import LinkButton from '../../ui/LinkButton';

export default function EmptyCart() {
  return (
    <div className="px-3 py-3">
      <LinkButton to="/menu">&larr; Back to Menu</LinkButton>

      <p className="font-semibold">
        Your cart is still empty. Start adding some pizzas.
      </p>
    </div>
  );
}
