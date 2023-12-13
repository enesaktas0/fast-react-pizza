import React from 'react';
import { getOrder } from '../../services/apiRestaurant';
import { useLoaderData } from 'react-router-dom';
import OrderItem from './OrderItem';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';

export default function Order() {
  const order = useLoaderData();

  const {
    priority,
    status,
    id,
    estimatedDelivery,
    orderPrice,
    priorityPrice,
    cart,
  } = order;

  const leftMinutes = calcMinutesLeft(estimatedDelivery);

  console.log(order);

  return (
    <div className="space-y-8 px-6 py-6">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>
        <div className="flex flex-wrap items-center space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-2 py-1 font-semibold uppercase text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-2 py-1 font-semibold uppercase text-green-50">
            <p>{status} order</p>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-200 px-6 py-4">
        <p className="font-medium">
          {leftMinutes > 0
            ? `Only ${leftMinutes}
          minutes left`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimate delivery : {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divid-stone-200 borde-b divide-y border-t">
        {cart.map((pizza) => {
          return <OrderItem pizza={pizza} key={pizza.pizzaId} />;
        })}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-4">
        <p className="text-sm font-medium text-stone-600 ">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        <p className="text-sm font-medium text-stone-600">
          Price priorrity: {formatCurrency(priorityPrice)}
        </p>
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
