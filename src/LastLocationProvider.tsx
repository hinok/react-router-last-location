import * as React from 'react';
import * as PropTypes from 'prop-types';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import LastLocationContext, { LastLocationType } from './LastLocationContext';

let lastLocation: LastLocationType = null;

type UpdateLastLocation = {
  location: LastLocationType;
  nextLocation: RouteComponentProps['location'];
  watchOnlyPathname: boolean;
};

const updateLastLocation = ({ location, nextLocation, watchOnlyPathname }: UpdateLastLocation) => {
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

interface Props extends RouteComponentProps {
  watchOnlyPathname: boolean;
  children: React.ReactNode;
};

type DefaultProps = {
  watchOnlyPathname: boolean;
};

type State = Readonly<{
  currentLocation: LastLocationType;
}>;

class LastLocationProvider extends React.Component<Props, State> {
  static propTypes = {
    watchOnlyPathname: PropTypes.bool,
    children: PropTypes.node.isRequired,
  };

  static defaultProps: DefaultProps = {
    watchOnlyPathname: false,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    updateLastLocation({
      location: state.currentLocation,
      nextLocation: props.location,
      watchOnlyPathname: props.watchOnlyPathname,
    });

    return {
      currentLocation: props.location,
    };
  }

  readonly state: State = {
    currentLocation: null,
  };

  render() {
    const { children } = this.props;

    return (
      <LastLocationContext.Provider value={lastLocation}>{children}</LastLocationContext.Provider>
    );
  }
}

export const getLastLocation = () => lastLocation;

export const setLastLocation = (nextLastLocation: LastLocationType) => {
  lastLocation = nextLastLocation;
};

/**
 * @see https://github.com/Microsoft/TypeScript/issues/23812#issuecomment-426771485
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28515
 */
export default withRouter(LastLocationProvider as React.ComponentType<Props>);
