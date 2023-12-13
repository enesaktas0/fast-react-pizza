import React from 'react';
import { formatCurrency } from '../../utils/helpers';


export default function OrderItem({ pizza }) {
 

  return (
    <li className="py-3">
      <div className="gpa-4 flex flex-wrap items-center justify-between text-sm font-bold sm:text-base">
        <p>
          {pizza.quantity}&times; {pizza.name}
        </p>
        
        <p>{formatCurrency(pizza.totalPrice)}</p>
      </div>
    </li>
  );
}
