import React from 'react';
import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

export default function Header() {
  return (
    <header className="border-radi flex justify-center border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <div className="flex w-full max-w-7xl  items-center justify-between">
        <Link to="/" className="tracking-widest">
          Fast React Pizza Co.
        </Link>
        <SearchOrder />

        <Username />
      </div>
    </header>
  );
}
