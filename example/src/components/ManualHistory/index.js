import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ManualHistory extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  handleClick(pathname) {
    const to = {
      pathname,
      state: {
        from: pathname,
        datetime: Date.now(),
      },
    };

    const { history } = this.props;
    history.push(to);
  }

  render() {
    return (
      <ul>
        <li>
          <button type="button" onClick={() => this.handleClick('/')}>
            Home (with state)
          </button>
        </li>
        <li>
          <button type="button" onClick={() => this.handleClick('/about')}>
            About (with state)
          </button>
        </li>
        <li>
          <button type="button" onClick={() => this.handleClick('/contact')}>
            Contact (with state)
          </button>
        </li>
      </ul>
    );
  }
}

export default withRouter(ManualHistory);
