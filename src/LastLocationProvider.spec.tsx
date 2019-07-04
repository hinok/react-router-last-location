import * as React from 'react';
import { mount } from 'enzyme';
import { History } from 'history';

const prepareTest = ({ watchOnlyPathname }:{ watchOnlyPathname?: boolean } = {}) => {
  jest.resetModules();

  // We need fresh instance of MemoryRouter after resetModules()
  // @see https://stackoverflow.com/questions/56664997/jest-resetmodules-is-breaking-react-router-dom-context
  const { MemoryRouter } = require('react-router-dom');
  const { default: LastLocationProvider, getLastLocation } = require('./LastLocationProvider');

  const App: React.FC = props => (
    <MemoryRouter initialEntries={['/']}>
      <LastLocationProvider watchOnlyPathname={watchOnlyPathname} {...props}>
        <div>Test</div>
      </LastLocationProvider>
    </MemoryRouter>
  );

  const wrapper = mount(<App />);

  const history: History = wrapper.find('LastLocationProvider').prop('history');

  return {
    wrapper,
    history,
    getLastLocation,
  };
};

describe('LastLocationProvider', () => {
  describe('When watchOnlyPathname is false', () => {
    it('should set lastLocation each time when route is changed', () => {
      const { getLastLocation, history } = prepareTest();

      expect(getLastLocation()).toBeNull();
      history.push('/test-1');
      expect(getLastLocation()).toMatchObject({ pathname: '/' });
      history.push('/test-2');
      expect(getLastLocation()).toMatchObject({ pathname: '/test-1' });
      history.push('/test-3');
      expect(getLastLocation()).toMatchObject({ pathname: '/test-2' });
    });
  });

  describe('When watchOnlyPathname is true', () => {
    it('should set lastLocation each time when pathname in location is changed', () => {
      const { getLastLocation, history } = prepareTest({ watchOnlyPathname: true });

      expect(getLastLocation()).toBeNull();
      history.push('/test-1');
      expect(getLastLocation()).toMatchObject({ pathname: '/' });
      history.push('/test-1?foo=bar');
      expect(getLastLocation()).toMatchObject({ pathname: '/' });
      history.push('/test-1?foo=zoo');
      expect(getLastLocation()).toMatchObject({ pathname: '/' });
    });
  });

  it('should do nothing if application is rerendered and location is the same', () => {
    const { wrapper, getLastLocation, history } = prepareTest();

    history.push('/test-1');
    history.push('/test-2');

    const lastLocationPrev = getLastLocation();
    /**
     * This one is a bit tricky. I want to test case when `getDerivedStateFromProps` would be
     * called when location is not changing, e.g. any other prop is changing...
     * @see https://github.com/airbnb/enzyme/issues/1925#issuecomment-463248558
     */
    wrapper.setProps({ pleaseRerenderLastLocationProvider: true });
    const lastLocationNext = getLastLocation();

    expect(lastLocationPrev).toBe(lastLocationNext);
  });

  it('should NOT store redirected locations', () => {
    const { getLastLocation, history } = prepareTest();

    expect(getLastLocation()).toBeNull();

    history.push('/test-1');
    expect(getLastLocation()).toMatchObject({ pathname: '/' });

    history.replace('/test-2', { preventLastLocation: true });
    expect(getLastLocation()).toMatchObject({ pathname: '/' });

    history.replace('/test-3', { preventLastLocation: true });
    expect(getLastLocation()).toMatchObject({ pathname: '/' });

    history.replace('/test-4');
    expect(getLastLocation()).toMatchObject({ pathname: '/test-3' });
  });
});
