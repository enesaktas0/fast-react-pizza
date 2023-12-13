import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { useSelector } from 'react-redux';
import { getTotalPrice, getTotalQuantity } from './cartSlice';

export default function CartOverview() {
  const totalQuantity = useSelector(getTotalQuantity);

  const total = useSelector(getTotalPrice);

  if (!totalQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-900 p-4 uppercase text-stone-200 sm:px-6">
      <p className="space-x-4 font-semibold text-stone-400 sm:space-x-6  ">
        <span>{totalQuantity} Pizzas</span>
        <span>{formatCurrency(total)}</span>
      </p>
      <Link to="/cart">Open Cart &rarr;</Link>
    </div>
  );
}
