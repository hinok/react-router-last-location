// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from 'linaria';

const fonts = {
  sans: '\'Roboto\', sans-serif',
  mono: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
};

export const typeMono = css`
  font-family: ${fonts.mono};
`;

export const globals = css`
  :global {
    html {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      font-size: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
      font-family: ${fonts.sans};
      line-height: 1.5;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(0, 0, 0, 0.12);
    }

    pre {
      font-family: ${fonts.mono};
      margin: 0;
      padding: 0;
      font-size: 0.75rem;
    }
  }
`;

export const app = css`
  padding: 20px;
`;

export const header = css`
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;

  li:not(:last-child) {
    margin-right: 15px;
  }

  a {
    position: relative;
    text-decoration: none;
    color: royalblue;
  }

  a:global(.active) {
    font-weight: bold;

    &::before {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      margin-bottom: -13px;
      left: 0;
      width: 100%;
      height: 2px;
      background: royalblue;
    }
  }

  .${typeMono} {
    font-size: 0.875em;
  }
`;

export const badge = css`
  font-family: ${fonts.mono};
  font-size: 0.75em;
  line-height: 1;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.1);
  padding: 3px 5px;
`;
