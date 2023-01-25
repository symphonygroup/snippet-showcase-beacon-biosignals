import React from 'react';
import { render } from '@testing-library/react';
import { customReduxWrapper, wrap, wrappers } from '../../utils-tests';
import Initializator from './Initializator';

describe('Initializator', () => {
  const REDUX_STATE = {
    user: {
      loggingIn: false,
      loading: false,
    },
  };
  test('should render children provided as props', () => {
    const children = <div>child component</div>;
    const wrappedComponent = customReduxWrapper(
      <Initializator>{children}</Initializator>,
      REDUX_STATE
    );
    render(wrap(wrappedComponent.component).with(wrappers.memoryRouter));
  });
});
