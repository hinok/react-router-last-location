// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from 'linaria';

export const globals = css`
  :global {
    html {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
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
      margin: 0;
      padding: 0;
      font-family: 'Inconsolata', serif;
      font-size: 16px;
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
`;
