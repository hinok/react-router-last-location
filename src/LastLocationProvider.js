import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

let lastLocation = null;

class LastLocationProvider extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      lastLocation = {
        ...this.props.location,
      };
    }
  }

  render() {
    return this.props.children;
  }
}

export const getLastLocation = () => lastLocation;
export default withRouter(LastLocationProvider);
