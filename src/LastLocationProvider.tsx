import * as React from 'react';
import * as PropTypes from 'prop-types';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import LastLocationContext, { LastLocationType } from './LastLocationContext';
import { Assign } from './types';
import { hasBeenPrevented, prevent, shouldPrevent } from './prevent';

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

  if (shouldPrevent(nextLocation) && !hasBeenPrevented(nextLocation)) {
    prevent(nextLocation);
    return;
  }

  lastLocation = { ...location };
};

interface Props extends RouteComponentProps {
  watchOnlyPathname: boolean;
  children: React.ReactNode;
}

type State = Readonly<{
  currentLocation: LastLocationType;
}>;

class LastLocationProvider extends React.Component<Props, State> {
  static propTypes = {
    watchOnlyPathname: PropTypes.bool,
    children: PropTypes.node.isRequired,
  };

  static defaultProps: Pick<Props, 'watchOnlyPathname'> = {
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
 * Unfortunately defaultProps doesn't work in this case
 * @see https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#support-for-defaultprops-in-jsx
 *
 * Related issues:
 * @see https://github.com/Microsoft/TypeScript/issues/23812#issuecomment-426771485
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28515
 */
type ExportedProps = Assign<
  Pick<Props, Exclude<keyof Props, 'watchOnlyPathname'>>,
  { watchOnlyPathname?: boolean }
>;

export default withRouter(LastLocationProvider as React.ComponentClass<ExportedProps>);
