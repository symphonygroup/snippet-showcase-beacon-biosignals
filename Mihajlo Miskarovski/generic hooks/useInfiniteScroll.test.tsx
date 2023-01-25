import React from 'react';
import { renderHook, cleanup } from '@testing-library/react-hooks';
import useInfiniteScroll from '.';

beforeAll(() => {
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
  };
  window.resizeTo(1000, 1000);
});
afterEach(cleanup);

function setupVisible() {
  const useRefSpy = jest.spyOn(React, 'useRef');
  const triggerRefSpy = useRefSpy.mockImplementationOnce(() => ({
    current: { getBoundingClientRect: () => ({ top: 500 }) },
  }));
  const pageRefSpy = useRefSpy.mockImplementationOnce(() => ({
    current: 0,
  }));

  return { triggerRefSpy, pageRefSpy };
}

function setupNotVisible() {
  const useRefSpy = jest.spyOn(React, 'useRef');
  const triggerRefSpy = useRefSpy.mockImplementationOnce(() => ({
    current: { getBoundingClientRect: () => ({ top: 1100 }) },
  }));
  const pageRefSpy = useRefSpy.mockImplementationOnce(() => ({
    current: 0,
  }));

  return { triggerRefSpy, pageRefSpy };
}

describe('useInfiniteScroll', () => {
  test('should call next function if hasMore=true, page=0 and rows is empty', () => {
    setupVisible();

    const initialState = { hasMore: true, loading: false, next: jest.fn(), rows: [], page: 0, size: 10, sort: [] };
    renderHook(() => useInfiniteScroll(initialState));

    expect(initialState.next).toBeCalledTimes(1);
    expect(initialState.next).toBeCalledWith({
      page: initialState.page,
      size: initialState.size,
      sort: initialState.sort,
    });
  });

  test('should call next function if page > 0', () => {
    setupVisible();

    const initialState = { hasMore: true, loading: false, next: jest.fn(), rows: [], page: 2, size: 10, sort: [] };
    renderHook(() => useInfiniteScroll(initialState));

    expect(initialState.next).toBeCalledTimes(1);
    expect(initialState.next).toBeCalledWith({
      page: initialState.page,
      size: initialState.size,
      sort: initialState.sort,
    });
  });

  test('should not call next function if trigger is not visible', () => {
    setupNotVisible();

    const initialState = { hasMore: true, loading: false, next: jest.fn(), rows: [], page: 0, size: 10, sort: [] };
    renderHook(() => useInfiniteScroll(initialState));

    expect(initialState.next).not.toBeCalled();
  });

  test('should not call next function if currently loading', () => {
    setupVisible();

    const initialState = { hasMore: true, loading: true, next: jest.fn(), rows: [], page: 0, size: 10, sort: [] };
    renderHook(() => useInfiniteScroll(initialState));

    expect(initialState.next).not.toBeCalled();
  });

  test('should not call next function if hasMore = false (no more items to be fetched from backend)', () => {
    setupVisible();

    const initialState = { hasMore: false, loading: false, next: jest.fn(), rows: [], page: 0, size: 10, sort: [] };
    renderHook(() => useInfiniteScroll(initialState));

    expect(initialState.next).not.toBeCalled();
  });

  test('should not call next function if trigger is not defined', () => {
    const useRefSpy = jest.spyOn(React, 'useRef');
    useRefSpy.mockImplementationOnce(() => ({
      current: undefined,
    }));
    useRefSpy.mockImplementationOnce(() => ({
      current: 0,
    }));

    const initialState = { hasMore: true, loading: true, next: jest.fn(), rows: [], page: 0, size: 10, sort: [] };
    renderHook(() => useInfiniteScroll(initialState));

    expect(initialState.next).not.toBeCalled();
  });
});
