import * as React from 'react';
import { mount } from 'enzyme';
import { History } from 'history';
import { MemoryRouter } from 'react-router-dom';
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
  const TestComponent = () => <div>Test</div>;
  const TestComponentWithLastLocation = withLastLocation(TestComponent);
  const wrapper = mount((
    <MemoryRouter initialEntries={['/']}>
      <TestComponentWithLastLocation />
    </MemoryRouter>
  ));

  return {
    TestComponent,
    TestComponentWithLastLocation,
    wrapper,
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
      const { wrapper } = prepareTest();
      expect(wrapper.html()).toBe('<div>Test</div>');
    });

    it('should pass lastLocation as a parameter to the wrapped component', () => {
      const { TestComponent, wrapper } = prepareTest();
      const lastLocationAsProp = wrapper.find(TestComponent).prop('lastLocation');
      expect(lastLocationAsProp).toEqual(mockLocation);
    });

    it('should call getLastLocation when route is changed', () => {
      const { TestComponent, wrapper } = prepareTest();
      expect(mockedGetLastLocation.mock.calls.length).toBe(1);
      const history: History = wrapper.find(TestComponent).prop('history');
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
