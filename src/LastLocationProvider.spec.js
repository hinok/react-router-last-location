/* eslint-disable global-require */
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

describe('LastLocationProvider', () => {
  describe('When watchOnlyPathname is false', () => {
    it('should set lastLocation each time when route is changed', () => {
      jest.resetModules();

      const {
        default: LastLocationProvider,
        getLastLocation,
      } = require('./LastLocationProvider');

      const wrapper = mount((
        <MemoryRouter initialEntries={['/']}>
          <LastLocationProvider>
            <div>Test</div>
          </LastLocationProvider>
        </MemoryRouter>
      ));
      const history = wrapper.find('LastLocationProvider').prop('history');

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
      jest.resetModules();

      const {
        default: LastLocationProvider,
        getLastLocation,
      } = require('./LastLocationProvider');

      const wrapper = mount((
        <MemoryRouter initialEntries={['/']}>
          <LastLocationProvider watchOnlyPathname>
            <div>Test</div>
          </LastLocationProvider>
        </MemoryRouter>
      ));
      const history = wrapper.find('LastLocationProvider').prop('history');

      expect(getLastLocation()).toBeNull();
      history.push('/test-1');
      expect(getLastLocation()).toMatchObject({ pathname: '/' });
      history.push('/test-1?foo=bar');
      expect(getLastLocation()).toMatchObject({ pathname: '/' });
      history.push('/test-1?foo=zoo');
      expect(getLastLocation()).toMatchObject({ pathname: '/' });
    });
  });
});
