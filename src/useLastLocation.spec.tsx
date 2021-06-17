/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { renderHook as rtlRenderHook, act } from '@testing-library/react-hooks';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import useLastLocation from './useLastLocation';
import LastLocationProvider from './LastLocationProvider';

function renderHook() {
  const history = createMemoryHistory({
    initialEntries: ['/'],
    initialIndex: 0,
  });

  return {
    history,
    ...rtlRenderHook(() => useLastLocation(), {
      wrapper: ({ children }) => (
        <Router history={history}>
          <LastLocationProvider>
            {children}
          </LastLocationProvider>
        </Router>
      ),
    }),
  };
}

describe('useLastLocation', () => {
  it('should have no last location on the first visit', async () => {
    const { result } = renderHook();

    expect(result.current).toBe(null);
  });

  it('Home ► About, should show / as last location', () => {
    const { history, result } = renderHook();
    expect(result.current).toBe(null);

    act(() => {
      history.push('/about');
    });

    expect(result.current).not.toBe(null);
    // @ts-ignore
    expect(result.current.pathname).toBe('/');
  });

  it('Home ► About ► Contact, should show /about as last location', () => {
    const { history, result } = renderHook();

    act(() => {
      history.push('/about');
    });

    expect(result.current).not.toBe(null);
    // @ts-ignore
    expect(result.current.pathname).toBe('/');

    act(() => {
      history.push('/contact');
    });

    expect(result.current).not.toBe(null);
    // @ts-ignore
    expect(result.current.pathname).toBe('/about');
  });
});
