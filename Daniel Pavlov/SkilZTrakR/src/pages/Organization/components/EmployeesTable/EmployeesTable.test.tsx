import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { customReduxWrapper, wrap, wrappers } from '../../../../utils-tests';
import EmployeesTable from '.';

describe('EmployeesTable', () => {
  const REDUX_STATE = {
    organizationEmployees: {
      list: [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@symphony.is',
          image: null,
          status: 'ACTIVE',
          role: 'USER',
          skills: [
            {
              name: 'ReactJS',
              assessment: 4,
              comment: 'Test comment',
              status: 'COMPLETED',
            },
            {
              name: 'Angular',
              assessment: 0,
              comment: 'Test comment',
              status: 'PENDING',
            },
            {
              name: 'JavaScript',
              assessment: 3,
              comment: 'Test comment',
              status: 'PENDING',
            },
          ],
        },
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@symphony.is',
          image: null,
          status: 'DEACTIVATED',
          role: 'USER',
          skills: [
            {
              name: 'ReactJS',
              assessment: 4,
              comment: 'Test comment',
              status: 'COMPLETED',
            },
            {
              name: 'Angular',
              assessment: 0,
              comment: 'Test comment',
              status: 'PENDING',
            },
          ],
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@symphony.is',
          image: null,
          status: 'INVITED',
          role: 'ADMIN',
          skills: [],
        },
      ],
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

  test('Should render row for each employee', () => {
    render(wrap(<EmployeesTable />).with(wrappers.redux(REDUX_STATE)));

    expect(
      screen.getAllByTestId('organization-employees-table-row')
    ).toHaveLength(REDUX_STATE.organizationEmployees.list.length);
  });

  test('Should render No data available if there is not any employee', () => {
    const state = {
      ...REDUX_STATE,
      organizationEmployees: {
        ...REDUX_STATE.organizationEmployees,
        list: [],
        hasMore: false,
      },
    };
    render(wrap(<EmployeesTable />).with(wrappers.redux(state)));
  });

  test('Should render Loading', () => {
    const state = {
      ...REDUX_STATE,
      organizationEmployees: {
        ...REDUX_STATE.organizationEmployees,
        loading: true,
      },
    };
    render(wrap(<EmployeesTable />).with(wrappers.redux(state)));
  });

  test('Should be able to handle sort', async () => {
    const wrappedComponent = customReduxWrapper(
      <EmployeesTable />,
      REDUX_STATE
    );

    render(wrap(<EmployeesTable />).with(wrappers.redux(REDUX_STATE)));

    wrappedComponent.dispatch.mockReset();

    const sortByEmployee = screen.getByText('Employee');

    fireEvent.click(sortByEmployee);
  });

  test('Should call handleShowDeactivatedUsers function', async () => {
    render(wrap(<EmployeesTable />).with(wrappers.redux(REDUX_STATE)));

    const showDeactivatedCheckbox = screen.getByTestId(
      'organization-employees-table-show-deactivated-checkbox'
    );

    expect(showDeactivatedCheckbox).toBeInTheDocument();

    fireEvent.click(showDeactivatedCheckbox, { target: { checked: true } });
  });
});
