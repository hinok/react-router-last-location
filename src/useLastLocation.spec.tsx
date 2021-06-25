/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { renderHook as rtlRenderHook, act } from '@testing-library/react-hooks';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import useLastLocation from './useLastLocation';
import LastLocationProvider from './LastLocationProvider';

function renderHook(watchOnlyPathname?: boolean) {
  const history = createMemoryHistory({
    initialEntries: ['/'],
    initialIndex: 0,
  });

  return {
    history,
    ...rtlRenderHook(() => useLastLocation(), {
      wrapper: ({ children }) => (
        <Router history={history}>
          <LastLocationProvider watchOnlyPathname={watchOnlyPathname}>
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


describe('When watchOnlyPathname is true', () => {
  it('should set lastLocation each time when pathname in location is changed', () => {
    const { history, result } = renderHook(true);

    act(() => {
      history.push('/test-1');
    });
    expect((result.current as any).pathname).toBe('/');
    act(() => {
      history.push('/test-1?foo=bar');
    });
    expect((result.current as any).pathname).toBe('/');
    act(() => {
      history.push('/test-1?foo=zoo');
    });
    expect((result.current as any).pathname).toBe('/');
  });
});

it('should do nothing if application is rerendered and location is the same', () => {
  const { history, result, rerender } = renderHook();
  act(() => {
    history.push('/test-1');
    history.push('/test-2');
  });

  const lastLocationPrev = (result.current as any).pathname;
  /**
     * This one is a bit tricky. I want to test case when `getDerivedStateFromProps` would be
     * called when location is not changing, e.g. any other prop is changing...
     * @see https://github.com/airbnb/enzyme/issues/1925#issuecomment-463248558
     */
  rerender();
  const lastLocationNext = (result.current as any).pathname;

  expect(lastLocationPrev).toBe(lastLocationNext);
});

  it('should NOT store redirected locations', () => {
    const { history, result } = renderHook();

    act(() => {
      history.push('/test-1')
      ;})
    expect((result.current as any).pathname).toBe('/');

    act(() => {
      history.replace('/test-2', { preventLastLocation: true })
      ;})
    expect((result.current as any).pathname).toBe('/');

    act(() => {
      history.replace('/test-3', { preventLastLocation: true })
      ;})
    expect((result.current as any).pathname).toBe('/');

    act(() => {
      history.replace('/test-4')
      ;})
    expect((result.current as any).pathname).toBe('/test-3');
  });
