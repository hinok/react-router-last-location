/* eslint-disable global-require */
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route, Link } from 'react-router-dom';
import useLastLocation from './useLastLocation';
import LastLocationProvider, { setLastLocation } from './LastLocationProvider';

const Logger = () => {
  const lastLocation = useLastLocation();

  return (
    <div className="last-location">
      {lastLocation ? (
        <span className="last-location-pathname">{lastLocation.pathname}</span>
      ) : (
        'No last location'
      )}
    </div>
  );
};

const Navigation = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/contact">Contact</Link>
    </li>
  </ul>
);

// eslint-disable-next-line react/prop-types
const Page = ({ children }) => (
  <div>
    <h1>{children}</h1>
    <Logger />
  </div>
);

const Home = () => <Page>Home</Page>;
const About = () => <Page>About</Page>;
const Contact = () => <Page>Contact</Page>;

const suite = () => {
  // We need to reset lastLocation for each run in tests
  setLastLocation(null);

  const appWrapper = mount(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <LastLocationProvider>
        <div>
          <Navigation />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/" component={Home} exact />
        </div>
      </LastLocationProvider>
    </MemoryRouter>,
  );

  const getLink = text => appWrapper
    .find(Link)
    .find({ to: text })
    .children();

  return {
    get homeLink() {
      return getLink('/');
    },
    get aboutLink() {
      return getLink('/about');
    },
    get contactLink() {
      return getLink('/contact');
    },
    get lastLocation() {
      return appWrapper.find('.last-location-pathname');
    },
    get lastLocationPathname() {
      return this.lastLocation.text();
    },
    get hasLastLocation() {
      return this.lastLocation.length === 1;
    },
    get pageTitle() {
      return appWrapper.find('h1').text();
    },
    click(wrapper) {
      // We need to pass mock event { button: 0 }
      // @see https://github.com/airbnb/enzyme/issues/516#issue-167924470
      wrapper.simulate('click', { button: 0 });
    },
  };
};

describe('useLastLocation', () => {
  // This one is a bit silly but I wanted to be 100% sure that
  // my mini react application in tests is working correctly
  it('should change content when route changes', () => {
    const $ = suite();
    expect($.pageTitle).toBe('Home');

    $.click($.aboutLink);
    expect($.pageTitle).toBe('About');

    $.click($.contactLink);
    expect($.pageTitle).toBe('Contact');
  });

  it('should not render last location on the first visit', () => {
    const $ = suite();
    expect($.hasLastLocation).toBe(false);
  });

  it('Home ► About, should show / as last location', () => {
    const $ = suite();
    expect($.hasLastLocation).toBe(false);

    $.click($.aboutLink);
    expect($.hasLastLocation).toBe(true);
    expect($.lastLocationPathname).toBe('/');
  });

  it('Home ► About ► Contact, should show /about as last location', () => {
    const $ = suite();

    $.click($.aboutLink);
    expect($.hasLastLocation).toBe(true);
    expect($.lastLocationPathname).toBe('/');

    $.click($.contactLink);
    expect($.hasLastLocation).toBe(true);
    expect($.lastLocationPathname).toBe('/about');
  });
});
