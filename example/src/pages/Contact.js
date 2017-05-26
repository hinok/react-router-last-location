import React, { PureComponent } from 'react';

export default class Contact extends PureComponent {
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
