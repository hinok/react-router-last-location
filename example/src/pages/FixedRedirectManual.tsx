import * as React from 'react';
import { Redirect } from 'react-router-dom';

const FixedRedirectManual: React.FC = () => (
  <Redirect to={{ pathname: '/', state: { preventLastLocation: true } }} />
);

export default FixedRedirectManual;
