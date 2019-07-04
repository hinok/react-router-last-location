import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Page from './Page';

export default class Contact extends React.PureComponent<RouteComponentProps> {
  render() {
    const { location } = this.props;
    return <Page title="Contact!" location={location} />;
  }
}
