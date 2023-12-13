import React from 'react';
import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

export default function Error() {
  const error = useRouteError();

  return (
    <div>
      <h3>Something went wrong</h3>
      <span>{error.data || error.message}</span>
      <br />

      <LinkButton to="-1">Go Back</LinkButton>
    </div>
  );
}
