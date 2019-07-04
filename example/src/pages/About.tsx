import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Page from './Page';

const About: React.FC<RouteComponentProps> = ({ location }) => (
  <Page location={location} title="About!" />
);

export default About;
