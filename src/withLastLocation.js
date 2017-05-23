import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getLastLocation } from './LastLocationProvider';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default WrappedComponent => {
  class WithLastLocation extends Component {
    constructor(...args) {
      super(...args);
    }

    render() {
      return (
        <WrappedComponent
            lastLocation={getLastLocation()}
            {...this.props}
        />
      );
    }
  }

  WithLastLocation.displayName = `WithLastLocation(${getDisplayName(WrappedComponent)})`;

  return withRouter(WithLastLocation);
};
