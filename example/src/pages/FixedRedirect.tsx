import * as React from 'react';
import { Redirect } from 'react-router-dom';

const FixedRedirect: React.FC = () => (
  <Redirect to={{ pathname: '/', state: { preventLastLocation: true } }} />
);

export default FixedRedirect;
