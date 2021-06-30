import * as React from 'react';
import {
  MemoryRouter, Switch, Route, Link, RedirectProps,
} from 'react-router-dom';
import { LastLocationType } from './LastLocationContext';
import useLastLocation from './useLastLocation';
import RedirectWithoutLastLocation from './RedirectWithoutLastLocation';
import LastLocationProvider, { setLastLocation } from './LastLocationProvider';
import {  screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'


function rtlRender({ redirectTo }: { redirectTo: RedirectProps['to'] }) {
  const Page: React.FC = ({ children }) => {
    const lastLocation: LastLocationType = useLastLocation();

    return (
      <>
        <h1>{children}</h1>
        <nav data-testid="last-location-pathname">{lastLocation && lastLocation.pathname}</nav>
      </>
    );
  };

  const Home = () => <Page>Home</Page>;
  const About = () => <Page>About</Page>;
  const Secret: React.FC = () => <RedirectWithoutLastLocation to={redirectTo} />;

  return render(
        <MemoryRouter initialEntries={['/']}>
          <LastLocationProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/secret" component={Secret} />
            </Switch>
          </LastLocationProvider>
          <Link to="/">HomeLink</Link>
          <Link to="/about">AboutLink</Link>
          <Link to="/secret">SecretLink</Link>
        </MemoryRouter>
      )

}
afterEach(() => setLastLocation(null))
describe('RedirectWithoutLastLocation', () => {
  const runTest = () => {
    // Check if lastLocation is empty
    screen.getByTestId(/last-location-pathname/i)
    // Check if we are on the homepage
    screen.getByRole('heading', {
      name: /home/i
    })

    // Visit /about
    userEvent.click(screen.getByText(/AboutLink/i))
     
    // Check if we are on the /about
    screen.getAllByRole('heading', {
      name: /about/i
    })

    // Check lastLocation
    expect(screen.getByTestId(/last-location-pathname/i)).toHaveTextContent('/')

    // Visit /secret
    userEvent.click(screen.getByText(/SecretLink/i))
    // We Should be redirected back to homepage
    screen.getByRole('heading', {
      name: /home/i
    })

    // The lastLocation should point to /about
    expect(screen.getByTestId(/last-location-pathname/i)).toHaveTextContent('/about')
  };

  describe('When `to` is passed as a string', () => {
    it('should NOT store redirected route', () => {
     rtlRender({ redirectTo: '/' })
      runTest();
      
    });
  });
  describe('When `to` is passed as an object', () => {
    it('should store redirected route', () => {
      rtlRender({
        redirectTo: {
          pathname: '/',
        },
      })
      runTest();
    });
    })
    
});
