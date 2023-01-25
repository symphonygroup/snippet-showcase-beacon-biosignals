import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { wrap, wrappers } from '../../utils-tests';
import Login from './Login';
import { UserRole } from '../../api/types';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () =>
    jest.fn().mockImplementation(() => Promise.resolve({ title: 'test' })),
}));

describe('Login', () => {
  const reduxState = {
    user: {
      firstName: '',
      lastName: '',
      email: '',
      image: '',
      status: '',
      role: UserRole.User,
      loading: false,
      error: null,
    },
  };

  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  test('Should be able to render Login page', () => {
    render(
      wrap(<Login />).with(wrappers.memoryRouter, wrappers.redux(reduxState))
    );

    expect(screen.getByText('Welcome to SkilZTrakR')).toBeDefined();
  });

  test('Should call loginUser function', () => {
    render(
      wrap(<Login />).with(wrappers.memoryRouter, wrappers.redux(reduxState))
    );

    const loginUserButton = screen.getByTestId('login-google-button');

    expect(loginUserButton).toBeInTheDocument();

    fireEvent.click(loginUserButton);

    const loginAdminButton = screen.getByTestId('login-admin-button');

    expect(loginAdminButton).toBeInTheDocument();

    fireEvent.click(loginAdminButton);

    const loginEmployeeButton = screen.getByTestId('login-employee-button');

    expect(loginEmployeeButton).toBeInTheDocument();

    fireEvent.click(loginEmployeeButton);
  });
});
