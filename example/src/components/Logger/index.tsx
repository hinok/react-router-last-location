import * as React from 'react';
import * as PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from 'linaria';

const logger = css`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  color: #fff;
  font-size: 12px;
  padding: 10px;
  width: 300px;

  & + & {
    left: 320px;
  }

  h2 {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin: 0 0 1.5em;
  }

  h3 {
    font-family: 'Inconsolata', serif;
  }
`;

type Props = {
  title: React.ReactNode;
  data: object | null;
}

const Logger: React.FC<Props> = ({ title, data }) => (
  <div className={logger}>
    <h2>Logger</h2>
    <h3>{title}</h3>
    <pre>
      {JSON.stringify(data, undefined, 2)}
    </pre>
  </div>
);

Logger.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  title: PropTypes.node.isRequired,
};

Logger.defaultProps = {
  data: null,
};

export default Logger;
