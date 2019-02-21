import * as React from 'react';
import { useLastLocation } from '../../../../src';
import Logger from '../Logger';

const LoggerHooks: React.FC = () => {
  const lastLocation = useLastLocation();
  return <Logger title="hooks - useLastLocation" data={lastLocation} />;
};

export default LoggerHooks;
