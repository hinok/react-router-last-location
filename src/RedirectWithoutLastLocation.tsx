import * as React from 'react';
import { Redirect, RedirectProps } from 'react-router-dom';
import { createLocation } from 'history';

const RedirectWithoutLastLocation: React.FC<RedirectProps> = ({ to, ...rest }) => {
  let finalTo;

  if (typeof to === 'string') {
    finalTo = createLocation(to, { preventLastLocation: true });
  } else {
    finalTo = {
      ...to,
      state: {
        preventLastLocation: true,
        ...to.state,
      },
    };
  }

  return <Redirect {...rest} to={finalTo} />;
};

export default RedirectWithoutLastLocation;
