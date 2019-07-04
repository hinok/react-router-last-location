[![Build Status](https://travis-ci.org/hinok/react-router-last-location.svg?branch=master)](https://travis-ci.org/hinok/react-router-last-location)
[![Coverage Status](https://coveralls.io/repos/github/hinok/react-router-last-location/badge.svg?branch=master)](https://coveralls.io/github/hinok/react-router-last-location?branch=master)

# react-router-last-location

- Provides access to the last location in `react` + `react-router (v4.x, v5.x)` applications.
- ❤️ Using [`hooks`](https://reactjs.org/docs/hooks-overview.html)? If yes, `useLastLocation`.
- 💉 Using [`HOC`](https://reactjs.org/docs/higher-order-components.html)? - If yes, `withLastLocation`.
- Handle redirects.
- Support ![TypeScript](https://user-images.githubusercontent.com/1313605/53197634-df9a6d00-361a-11e9-81ba-69f8a941f8a2.png)
- Useful for handling internal routing.
- Easily prevent leaving your app by users.

## Demo

[![Edit react-router-last-location](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/zn208l91zp)

## Note: Last location != Previous browser history state

This library only returns the location that has been active before the recent location change in the current window lifetime.

This means, it is not equal to the "location that happened before navigating to this history state", or in other words "location to which you'll be redirected upon clicking browser back button".

**Example 1**

1. Visit `/`: last location = `null`, previous browser history state = `null`
2. Visit `/a`: last location = `/`, previous browser history state = `/`
3. Visit `/b`: last location = `/a`, previous browser history state = `/a`
4. Reload (url will stay at `/b`): last location = `null`, previous browser history state = `/a`

**Example 2**

1. Visit `/`: last location = `null`
2. Visit `/a`: last location = `/`
3. Visit `/b`: last location = `/a`
4. Go back: last location = `/b`, previous browser history state = `/`

**Example 3**

1. Visit `/`: last location = `null`
2. Visit `/a`: last location = `/`
3. Visit `/b`: last location = `/a`
4. Visit `/c`: last location = `/b`
4. Go back to `/a` (by selecting that state explicitly in "Go back" browser dropdown that is visible upon clicking it with right mouse button): last location = `/c`, previous browser history state = `/`

## How to use?

```bash
# Please remember that you should have installed react, prop-types and react-router-dom packages
# npm install react prop-types react-router-dom --save

npm install react-router-last-location --save
```

**If you still use `v1.x.x` and would like to use hook `useLastLocation`, please upgrade to `v2.x.x` version (don't worry, no breaking changes).**

```bash
npm install react-router-last-location@^2.0.0
# or
npm install react-router-last-location@latest
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

### Use `RedirectWithoutLastLocation` to don't store redirects as last location

```jsx
import React from 'react';
import { RedirectWithoutLastLocation } from 'react-router-last-location';

const MyPage = () => (
  <RedirectWithoutLastLocation to="/" />
);

export default MyPage;
```

You can still use regular `<Redirect />` component from `react-router` but then you need to pass manually the `state: { preventLastLocation: true }`, like below:

```jsx
import React from 'react';
import { Redirect } from 'react-router-dom';

const MyPage = () => (
  <Redirect
    to={{
      pathname: '/',
      state: { preventLastLocation: true },
    }}
  />
);

export default MyPage;
```

## LastLocationProvider

### Props

**`watchOnlyPathname`**, type: `boolean`, default: `false`

Stores the last route only when `pathname` has changed.
