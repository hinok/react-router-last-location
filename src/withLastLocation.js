import React from 'react';
import { withRouter } from 'react-router-dom';
import { getLastLocation } from './LastLocationProvider';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default (WrappedComponent) => {
  const WithLastLocation = props => (
    <WrappedComponent lastLocation={getLastLocation()} {...props} />
  );

  WithLastLocation.displayName = `WithLastLocation(${getDisplayName(WrappedComponent)})`;

  return withRouter(WithLastLocation);
};
