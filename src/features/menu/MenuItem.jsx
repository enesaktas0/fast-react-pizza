import React from 'react';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrQuantity, updateCart } from '../cart/cartSlice';
import IncAndDecButtons from '../../ui/IncAndDecButtons';
import DeleteItem from '../../ui/DeleteItem';

export default function MenuItem({ pizza }) {
  const { id, name, unitPrice, imageUrl, ingredients, soldOut } = pizza;

  const currQuantity = useSelector(getCurrQuantity(id));

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();

    const newPizza = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: 1 * unitPrice,
    };

    dispatch(updateCart(newPizza));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-semibold">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {soldOut ? (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          ) : (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          )}
          {currQuantity > 0 ? (
            <div className="flex flex-wrap justify-end gap-4">
              <IncAndDecButtons quantity={currQuantity} pizzaId={id} />
              <DeleteItem pizzaId={id} />
            </div>
          ) : (
            !soldOut && (
              <Button onClick={handleClick} type="small" disabled={soldOut}>
                Add to cart
              </Button>
            )
          )}
        </div>
      </div>
    </li>
  );
}
