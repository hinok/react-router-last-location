import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default class Contact extends React.PureComponent<RouteComponentProps> {
  render() {
    const { location } = this.props;

    return (
      <div>
        <h1>Contact!</h1>
        <pre>
          {JSON.stringify(location, undefined, 2)}
        </pre>
      </div>
    );
  }
}
