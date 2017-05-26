import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ManualHistory extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  handleClick(pathname) {
    const to = {
      pathname,
      state: {
        from: pathname,
        datetime: Date.now(),
      },
    };

    this.props.history.push(to);
  }

  render() {
    return (
      <ul>
        <li>
          <button onClick={() => this.handleClick('/')}>Home (with state)</button>
        </li>
        <li>
          <button onClick={() => this.handleClick('/about')}>About (with state)</button>
        </li>
        <li>
          <button onClick={() => this.handleClick('/contact')}>Contact (with state)</button>
        </li>
      </ul>
    );
  }
}

export default withRouter(ManualHistory);
