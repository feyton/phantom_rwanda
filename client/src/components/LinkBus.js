import React from 'react';
import { Link } from 'react-router-dom';

export const LinkBus = ({ row }) => {
  const { bus } = row.original;
  if (bus)
    return (
      <Link className="text-primary" to="#buses">
        {bus.plateNumber}
      </Link>
    );

  return 'None';
};
