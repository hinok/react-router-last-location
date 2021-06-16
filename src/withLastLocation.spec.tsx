import * as React from 'react';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import withLastLocation from './withLastLocation';
import { getLastLocation } from './LastLocationProvider';

const mockLocation = {
  pathname: '/testing-at-night',
  search: '',
  state: undefined,
  hash: undefined,
  key: '58sga71s',
};

jest.mock('./LastLocationProvider', () => ({
  getLastLocation: jest.fn(() => mockLocation),
}));

const mockedGetLastLocation = getLastLocation as jest.Mock<ReturnType<typeof getLastLocation>>;

const prepareTest = () => {
  const history = createMemoryHistory({initialEntries: ["/"]})
  const TestComponent = () => <div>Test</div>;
  const TestComponentWithLastLocation = withLastLocation(TestComponent);
  render(
    <Router history={history}>
      <TestComponentWithLastLocation />
    </Router>
  );

  return {
    TestComponent,
    TestComponentWithLastLocation,
    history
  };
};

describe('withLastLocation', () => {
  it('should be a function', () => {
    expect(typeof withLastLocation).toBe('function');
  });

  describe('When a react component is passed as a parameter', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should render the wrapped component', () => {
      prepareTest();
      expect(screen.getByText("Test")).toBeInTheDocument();
    });


    it('should call getLastLocation when route is changed', () => {
      const { TestComponent, history } = prepareTest();
      expect(mockedGetLastLocation.mock.calls.length).toBe(1);
      history.push('/saturday-night');
      expect(mockedGetLastLocation.mock.calls.length).toBe(2);
    });

    it('should set displayName for the parent component', () => {
      const TestComponent = () => <div>Test</div>;
      const TestComponentWithLastLocation = withLastLocation(TestComponent);
      expect(TestComponentWithLastLocation.displayName).toBe('withRouter(WithLastLocation(TestComponent))');
    });
  });
});
