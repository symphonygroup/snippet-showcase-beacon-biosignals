import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { wrap, wrappers } from '../../utils-tests';
import Skills from './Skills';
import { SkillsTabs } from '../../api/types';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () =>
    jest.fn().mockImplementation(() => Promise.resolve({ title: 'test' })),
}));

describe('Skills', () => {
  const reduxState = {
    user: {
      email: 'admin@symphony.is',
    },
    skillsPending: {
      list: [],
      hasMore: true,
      params: {
        page: 0,
        size: 20,
        sort: [],
        search: '',
      },
      loading: false,
      error: null,
    },
  };

  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  test('Should be able to render Skills page', () => {
    render(
      wrap(<Skills />).with(wrappers.memoryRouter, wrappers.redux(reduxState))
    );

    expect(screen.getByText('Skills')).toBeDefined();
  });

  test('Should call setSelectedTab function', () => {
    render(
      wrap(<Skills />).with(wrappers.memoryRouter, wrappers.redux(reduxState))
    );

    const selectTab = screen.getByTestId(`skills-tab-${SkillsTabs.Pending}`);

    expect(selectTab).toBeInTheDocument();

    fireEvent.click(selectTab);
  });
});
