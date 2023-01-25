import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Header, { Type } from './Header';
import { wrap, wrappers } from '../../utils-tests';
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

describe('Header', () => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@symphony.is',
    role: UserRole.Admin,
  };

  const REDUX_STATE = { user };

  test('Should display logo', () => {
    render(
      wrap(<Header type={Type.sticky} />).with(
        wrappers.memoryRouter,
        wrappers.redux(REDUX_STATE)
      )
    );

    expect(screen.getByTestId('logo')).toBeDefined();
  });

  test('Should display user circle with only first characters of first and last name', () => {
    render(
      wrap(<Header />).with(wrappers.memoryRouter, wrappers.redux(REDUX_STATE))
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId('userImage').children[0].innerHTML).toBe('JD');
  });

  test('Should display user circle with only first characters of first and last name and user is not Admin', () => {
    const state = { ...REDUX_STATE, user: { ...user, role: UserRole.User } };
    render(wrap(<Header />).with(wrappers.memoryRouter, wrappers.redux(state)));

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId('userImage').children[0].innerHTML).toBe('JD');
  });

  test('Should display full name as Guest if user.firstName and user.lastName are empty values', () => {
    const state = {
      ...REDUX_STATE,
      user: { ...user, firstName: '', lastName: '' },
    };
    render(wrap(<Header />).with(wrappers.memoryRouter, wrappers.redux(state)));

    expect(screen.getByTestId('userName')).toBeDefined();
    expect(screen.getByTestId('userName').innerHTML).toMatch('Guest');
  });

  test('Should call logoutUser function', () => {
    render(
      wrap(<Header />).with(wrappers.memoryRouter, wrappers.redux(REDUX_STATE))
    );

    const logoutUserMenuButton = screen.getByTestId('headerUserMenuButton');

    expect(logoutUserMenuButton).toBeInTheDocument();

    fireEvent.click(logoutUserMenuButton);

    const logoutUserButton = screen.getByTestId('headerUserMenuItemLogout');

    expect(logoutUserButton).toBeInTheDocument();

    fireEvent.click(logoutUserButton);
  });
});
