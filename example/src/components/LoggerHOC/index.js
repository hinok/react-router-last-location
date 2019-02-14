import React from 'react';
import PropTypes from 'prop-types';
import { withLastLocation } from '../../../../src';
import Logger from '../Logger';

const LoggerHOC = ({ lastLocation }) => (
  <Logger title="HOC - withLastLocation" data={lastLocation} />
);

LoggerHOC.propTypes = {
  lastLocation: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
  }),
};

LoggerHOC.defaultProps = {
  lastLocation: null,
};

export default withLastLocation(LoggerHOC);
