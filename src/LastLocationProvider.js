import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

let lastLocation = null;

class LastLocationProvider extends Component {
  static defaultProps = {
    watchOnlyPathname: false,
  };

  constructor(...args) {
    super(...args);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location === nextProps.location) {
      return;
    }

    if (!this.props.watchOnlyPathname) {
      lastLocation = {
        ...this.props.location,
      };
      return;
    }

    if (this.props.location.pathname === nextProps.location.pathname) {
      return;
    }

    lastLocation = {
      ...this.props.location,
    };
  }

  render() {
    return this.props.children;
  }
}

export const getLastLocation = () => lastLocation;
export default withRouter(LastLocationProvider);
