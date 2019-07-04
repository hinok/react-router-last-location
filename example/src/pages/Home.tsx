import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Page from './Page';

const Home: React.FC<RouteComponentProps> = ({ location }) => (
  <Page location={location} title="Home!" />
);

export default Home;
