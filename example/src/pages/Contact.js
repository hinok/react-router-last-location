import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Contact extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    location: PropTypes.object.isRequired,
  };

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
