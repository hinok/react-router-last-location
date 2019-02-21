import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

class ManualHistory extends React.Component<RouteComponentProps> {
  handleClick(pathname: string) {
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
