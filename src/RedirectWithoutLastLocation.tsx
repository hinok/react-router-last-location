import * as React from 'react';
import { Redirect, RedirectProps } from 'react-router-dom';
import { createLocation } from 'history';

const RedirectWithoutLastLocation: React.FC<RedirectProps> = ({ to, ...rest }) => {
  let finalTo = typeof to === 'string' ? createLocation(to, { preventLastLocation: true }) : to;
  return <Redirect {...rest} to={finalTo} />;
};

export default RedirectWithoutLastLocation;
