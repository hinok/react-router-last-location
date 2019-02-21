import * as React from 'react';
import { withLastLocation, WithLastLocationProps } from '../../../../src';
import Logger from '../Logger';

const LoggerHOC: React.FC<WithLastLocationProps> = ({ lastLocation }) => (
  <Logger title="HOC - withLastLocation" data={lastLocation} />
);

export default withLastLocation(LoggerHOC);
