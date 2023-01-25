import React from 'react';
import { flow, Many } from 'lodash';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

const middlewares: any[] = [];
const mockStore = configureStore(middlewares);

function wrap(component: JSX.Element) {
  return {
    with: (...w: Many<(...args: any[]) => any>[]): JSX.Element => {
      return flow(...w)(component);
    },
  };
}

const wrappers = {
  redux: (storeState: unknown) => (Component: JSX.Element) =>
    <Provider store={mockStore(storeState)}>{Component}</Provider>,
  memoryRouter: (Component: JSX.Element) => (
    <MemoryRouter>{Component}</MemoryRouter>
  ),
};

const customReduxWrapper = (Component: JSX.Element, state: unknown) => {
  const store = mockStore(state);

  const dispatch = jest.spyOn(store, 'dispatch');

  return {
    component: <Provider store={store}>{Component}</Provider>,
    dispatch,
  };
};

export { wrap, wrappers, customReduxWrapper };
