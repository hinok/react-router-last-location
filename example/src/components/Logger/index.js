import React from 'react';
import { withLastLocation } from './../../../../src';

const Logger = ({ lastLocation }) => (
  <div>
    <h2>Logger!</h2>
    <pre>
      {JSON.stringify(lastLocation, undefined, 2)}
    </pre>
  </div>
);

export default withLastLocation(Logger);
