import React from 'react';
import PropTypes from 'prop-types';
import { withLastLocation } from './../../../../src';

const Logger = ({ lastLocation }) => (
  <div>
    <h2>Logger (watching only pathname)</h2>
    <pre>
      {JSON.stringify(lastLocation, undefined, 2)}
    </pre>
  </div>
);

Logger.propTypes = {
  lastLocation: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
  }),
};

Logger.defaultProps = {
  lastLocation: null,
};

export default withLastLocation(Logger);
