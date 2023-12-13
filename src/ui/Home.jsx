import React from 'react';
import CreateUser from '../features/user/CreateUser';
import { useSelector } from 'react-redux';
import Button from './Button';

export default function Home() {
  const { fullName } = useSelector((store) => store.user);

  return (
    <div className="mb-10 mt-10 overflow-hidden px-4 text-center sm:my-16">
      <h1 className="mb-10 text-xl font-semibold text-stone-800 md:text-3xl">
        The best pizza
        <br />
        <span className="text-yellow-500">
          Straight out the oven, straight to you
        </span>
      </h1>
      {fullName === '' ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue Ordering, {fullName}
        </Button>
      )}
    </div>
  );
}
