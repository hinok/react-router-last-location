import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

let lastLocation = null;

const updateLastLocation = ({ location, nextLocation, watchOnlyPathname }) => {
  if (location === null) {
    return;
  }

  if (nextLocation === location) {
    return;
  }

  if (watchOnlyPathname && location.pathname === nextLocation.pathname) {
    return;
  }

  lastLocation = { ...location };
};

class LastLocationProvider extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    watchOnlyPathname: PropTypes.bool,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      key: PropTypes.string,
      state: PropTypes.object,
    }).isRequired,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    watchOnlyPathname: false,
  };

  static getDerivedStateFromProps(props, state) {
    updateLastLocation({
      location: state.currentLocation,
      nextLocation: props.location,
      watchOnlyPathname: props.watchOnlyPathname,
    });

    return {
      currentLocation: props.location,
    };
  }

  state = {
    currentLocation: null,
  };

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}

export const getLastLocation = () => lastLocation;
export default withRouter(LastLocationProvider);
