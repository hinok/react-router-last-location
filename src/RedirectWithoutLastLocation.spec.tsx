import * as React from 'react';
import { MemoryRouter, Switch, Route, Link, RedirectProps } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import { LastLocationType } from './LastLocationContext';
import useLastLocation from './useLastLocation';
import RedirectWithoutLastLocation from './RedirectWithoutLastLocation';
import LastLocationProvider, { setLastLocation } from './LastLocationProvider';

const prepareTest = ({ redirectTo }: { redirectTo: RedirectProps['to'] }) => {
  const Page: React.FC = ({ children }) => {
    const lastLocation: LastLocationType = useLastLocation();

    return (
      <>
        <div className="page">{children}</div>
        <div className="last-location-pathname">{lastLocation && lastLocation.pathname}</div>
      </>
    );
  };

  const Home = () => <Page>Home</Page>;
  const About = () => <Page>About</Page>;
  const Secret: React.FC = () => <RedirectWithoutLastLocation to={redirectTo} />;

  const App: React.FC = () => (
    <MemoryRouter initialEntries={['/']}>
      <LastLocationProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/secret" component={Secret} />
        </Switch>
      </LastLocationProvider>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/secret">Secret</Link>
    </MemoryRouter>
  );

  setLastLocation(null);
  const wrapper = mount(<App />);
  return { wrapper };
};

describe('RedirectWithoutLastLocation', () => {
  const runTest = (wrapper: ReactWrapper) => {
    // Check if lastLocation is empty
    expect(wrapper.find('.last-location-pathname').text()).toBe('');

    // Check if we are on the homepage
    expect(wrapper.find('.page').text()).toBe('Home');

    // Visit /about
    wrapper.find('a[href="/about"]').simulate('click', { button: 0 });

    // Check if we are on the /about
    expect(wrapper.find('.page').text()).toBe('About');

    // Check lastLocation
    expect(wrapper.find('.last-location-pathname').text()).toBe('/');

    // Visit /secret
    wrapper.find('a[href="/secret"]').simulate('click', { button: 0 });

    // We Should be redirected back to homepage
    expect(wrapper.find('.page').text()).toBe('Home');

    // The lastLocation should point to /about
    expect(wrapper.find('.last-location-pathname').text()).toBe('/about');
  };

  describe('When `to` is passed as a string', () => {
    it('should NOT store redirected route', () => {
      const { wrapper } = prepareTest({ redirectTo: '/' });
      runTest(wrapper);
    });
  });

  describe('When `to` is passed as an object', () => {
    const { wrapper } = prepareTest({
      redirectTo: {
        pathname: '/',
      },
    });
    runTest(wrapper);
  });
});
