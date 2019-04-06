import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { LastLocationProvider } from '../../src';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import RegularRedirect from './pages/RegularRedirect';
import FixedRedirect from './pages/FixedRedirect';
import AppLink from './components/AppLink';
import LoggerHOC from './components/LoggerHOC';
import LoggerHooks from './components/LoggerHooks';
import ManualHistory from './components/ManualHistory';
import * as styles from './styles';

const App = () => (
  <BrowserRouter>
    <LastLocationProvider watchOnlyPathname>
      <div className={styles.app}>
        <ul className={styles.header}>
          <li><AppLink exact to="/">Home</AppLink></li>
          <li><AppLink exact to="/about">About</AppLink></li>
          <li><AppLink exact to="/contact">Contact</AppLink></li>
          <li><AppLink exact to="/contact?foo=bar">Contact with search params</AppLink></li>
          <li><AppLink exact to="/regular-redirect">Regular Redirect</AppLink></li>
          <li><AppLink exact to="/fixed-redirect">Fixed Redirect</AppLink></li>
        </ul>
        <hr />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/regular-redirect" component={RegularRedirect} />
        <Route path="/fixed-redirect" component={FixedRedirect} />
        <hr />
        <ManualHistory />
        <LoggerHOC />
        <LoggerHooks />
      </div>
    </LastLocationProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
