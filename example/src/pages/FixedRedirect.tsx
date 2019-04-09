import * as React from 'react';
import RedirectWithoutLastLocation from '../../../src/RedirectWithoutLastLocation';

const FixedRedirect: React.FC = () => (
  <RedirectWithoutLastLocation to="/" />
);

export default FixedRedirect;
