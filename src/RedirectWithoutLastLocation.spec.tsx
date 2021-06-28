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
    screen.getAllByTestId(/last-location-pathname/i)
    // Check if we are on the homepage
    screen.getAllByRole('heading', {
      name: /home/i
    })

    // Visit /about
    userEvent.click(screen.getAllByText(/AboutLink/i)[0])
     
    // Check if we are on the /about
    screen.getAllByRole('heading', {
      name: /about/i
    })

    // Check lastLocation
    let pathName = screen.getAllByTestId(/last-location-pathname/i)
    expect(pathName[pathName.length -1]).toHaveTextContent('/')

    // Visit /secret
    userEvent.click(screen.getAllByText(/SecretLink/i)[0])
    // We Should be redirected back to homepage
    screen.getAllByRole('heading', {
      name: /home/i
    })

    // The lastLocation should point to /about
    pathName = screen.getAllByTestId(/last-location-pathname/i)
    expect(pathName[pathName.length -1]).toHaveTextContent('/about')
  };

  describe('When `to` is passed as a string', () => {
    it('should NOT store redirected route', () => {
     rtlRender({ redirectTo: '/' })
      runTest();
      
    });
  });
  describe('When `to` is passed as an object', () => {
    rtlRender({
      redirectTo: {
        pathname: '/',
      },
    })
    runTest();
  });
});
