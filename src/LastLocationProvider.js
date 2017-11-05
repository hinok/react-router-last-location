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
