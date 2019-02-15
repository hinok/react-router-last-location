[![Build Status](https://travis-ci.org/hinok/react-router-last-location.svg?branch=master)](https://travis-ci.org/hinok/react-router-last-location)
[![Coverage Status](https://coveralls.io/repos/github/hinok/react-router-last-location/badge.svg?branch=master)](https://coveralls.io/github/hinok/react-router-last-location?branch=master)

# react-router-last-location

- Provides access to the last location in `react` + `react-router (v4.x)` applications.
- ❤️ Using [`hooks`](https://reactjs.org/docs/hooks-overview.html)? If yes, `useLastLocation`.
- 💉 Using [`HOC`](https://reactjs.org/docs/higher-order-components.html)? - If yes, `withLastLocation`.
- Useful for handling internal routing.
- Easily prevent leaving your app by users.

## Demo

[![Edit react-router-last-location](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/wn9kr41z5l)

## How to use?

```bash
# Please remember that you should have installed react, prop-types and react-router-dom packages
# npm install react prop-types react-router-dom --save

npm install react-router-last-location --save
```

**If you'd like to use hook `useLastLocation`, please install `2.0.0-beta.0`**

```bash
npm install react-router-last-location@2.0.0-beta.0
```

### Declare `<LastLocationProvider />` inside `<Router />`.

`index.js`

```jsx
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Logger from './components/Logger';

const App = () => (
  <Router>
    <LastLocationProvider>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />

        <hr />

        <Logger />
      </div>
    </LastLocationProvider>
  </Router>
);

render(<App />, document.getElementById('root'));
```

### Use hook `useLastLocation` to get `lastLocation`.

`./components/Logger`, [see example](https://github.com/hinok/react-router-last-location/blob/eb552e0a82df6000ba140d8f20627b8bc68716b6/example/src/components/LoggerHooks/index.js)

```jsx
import React from 'react';
import { useLastLocation } from 'react-router-last-location';

const Logger = () => {
  const lastLocation = useLastLocation();

  return (
    <div>
      <h2>Logger!</h2>
      <pre>
        {JSON.stringify(lastLocation)}
      </pre>
    </div>
  );
};

export default LoggerHooks;

```

### Use HOC `withLastLocation` to get `lastLocation` prop.

`./components/Logger`, [see example](https://github.com/hinok/react-router-last-location/blob/eb552e0a82df6000ba140d8f20627b8bc68716b6/example/src/components/LoggerHOC/index.js)

```jsx
import React from 'react';
import { withLastLocation } from 'react-router-last-location';

const Logger = ({ lastLocation }) => (
  <div>
    <h2>Logger!</h2>
    <pre>
      {JSON.stringify(lastLocation)}
    </pre>
  </div>
);

export default withLastLocation(Logger);
```

## <LastLocationProdiver />

### Props

**`watchOnlyPathname`**, type: `boolean`, default: `false`

Stores the last route only when pathname has changed
