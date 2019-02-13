import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

let lastLocation = null;

class LastLocationProvider extends Component {
  static propTypes = {
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

  componentWillReceiveProps({ location: nextLocation }) {
    const { location, watchOnlyPathname } = this.props;

    if (location === nextLocation) {
      return;
    }

    if (!watchOnlyPathname) {
      lastLocation = {
        ...location,
      };
      return;
    }

    if (location.pathname === nextLocation.pathname) {
      return;
    }

    lastLocation = {
      ...location,
    };
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}

export const getLastLocation = () => lastLocation;
export default withRouter(LastLocationProvider);
