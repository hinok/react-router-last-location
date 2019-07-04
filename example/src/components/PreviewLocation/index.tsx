import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type Props = {
  location: RouteComponentProps['location']
}

const PreviewLocation: React.FC<Props> = ({ location }) => (
  <div>
    <strong>Your current location</strong>
    <pre>{JSON.stringify(location, undefined, 2)}</pre>
  </div>
);

export default PreviewLocation;
