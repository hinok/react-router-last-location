import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { getLastLocation } from './LastLocationProvider';
import { Subtract } from './types';

function getDisplayName<P>(WrappedComponent: React.ComponentType<P>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export interface WithLastLocationProps extends RouteComponentProps {
  lastLocation: ReturnType<typeof getLastLocation>;
}

const withLastLocation = <WrappedProps extends WithLastLocationProps>(
  WrappedComponent: React.ComponentType<WrappedProps>
) => {
  type HocProps = Subtract<WrappedProps, WithLastLocationProps> & RouteComponentProps;

  const WithLastLocation: React.FC<HocProps> = props => (
    <WrappedComponent lastLocation={getLastLocation()} {...props as WrappedProps} />
  );

  WithLastLocation.displayName = `WithLastLocation(${getDisplayName(WrappedComponent)})`;

  return withRouter(WithLastLocation);
};

export default withLastLocation;
