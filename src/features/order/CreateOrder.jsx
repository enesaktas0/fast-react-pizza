import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';

import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import store from '../../store';
import { fetchAddress } from '../user/userSlice';

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export default function CreateOrder() {
  const [priority, setPriority] = useState(false);
  const { fullName, status, position, address, error } = useSelector(
    (store) => store.user,
  );
  const isGeoLoading = status === 'loading';

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);
  const priorityPrice = priority ? totalPrice * 0.2 : 0;
  const finalPrice = priorityPrice + totalPrice;

  const handleGetPossition = (e) => {
    e.preventDefault();
    dispatch(fetchAddress());
  };

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h3 className="mb-8 text-xl font-semibold ">Ready to Order? Let's Go</h3>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Full Name</label>
          <input
            className="input w-full"
            type="text"
            name="customer"
            defaultValue={fullName}
            required
          />
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone</label>
          <div className="w-full">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Adress</label>
          <div className="w-full">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isGeoLoading}
              defaultValue={address}
              required
            />
            {status === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {error}
              </p>
            )}
          </div>

          <span className="absolute right-[3px] top-[2.17rem]  z-10 sm:top-[0.2rem]">
            {!position.latitude && !position.longitude && (
              <Button
                onClick={handleGetPossition}
                type="small"
                disabled={isGeoLoading}
              >
                Get Possition
              </Button>
            )}
          </span>
        </div>
        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold">
            Want to you give your order priority
          </label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={`${
              position.latitude &&
              position.longitude &&
              `${position.latitude},${position.longitude}`
            }`}
          />

          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? 'Placing Order...'
              : `Orden now ${formatCurrency(finalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  const error = {};
  if (!isValidPhone(order.phone)) {
    error.phone =
      'Please give us your correct phone number, We might need it to contect you';
  }

  if (Object.keys(error).length > 0) return error;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  // return null;
  return redirect(`/order/${newOrder.id}`);
}
