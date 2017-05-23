import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { LastLocationProvider } from './../../src';
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
