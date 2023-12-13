import React from 'react';
import { useSelector } from 'react-redux';

export default function Username() {
  const { fullName } = useSelector((store) => store.user);

  if (!fullName) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{fullName}</div>
  );
}
