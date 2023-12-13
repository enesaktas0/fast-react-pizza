import React from 'react';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from '../../ui/DeleteItem';
import IncAndDecButtons from '../../ui/IncAndDecButtons';

export default function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  // const [currentQuantity, setCurrentQuantity] = useState(quantity);

  return (
    <li className="space-y-2 py-3 sm:flex sm:justify-between">
      <p className="sm:md-0 mb-1">
        {quantity}&times; {name}
      </p>

      <div className="flex items-center justify-between sm:gap-6">
        <p>{formatCurrency(totalPrice)}</p>
        <IncAndDecButtons pizzaId={pizzaId} quantity={quantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}
