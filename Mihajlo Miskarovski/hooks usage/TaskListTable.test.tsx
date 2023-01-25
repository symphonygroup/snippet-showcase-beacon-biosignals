import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customReduxWrapper, wrap, wrappers } from '../../../../utils-tests';
import TaskListTable from './TaskListTable';
import dashboard from '../../../../store/reducers/dashboard';
import projectsReducer from '../../../../store/reducers/projects';

const mockedPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(() => ({
    push: mockedPush,
  })),
}));

const DUMMY_TASKS_DATA = [
  {
    id: 102386,
    adamId: '1448896978',
    song: {
      name: 'What Does Your Soul Look Like, Pt. 1 (Blue Sky Revisit)',
      artist: 'DJ Shadow',
      appleUrl:
        'https://music.apple.com/us/album/what-does-your-soul-look-like-pt-1-blue-sky-revisit/1448896560?i=1448896978',
      isrc: 'GBAQH9600074',
      iswc: null,
      composers: ['Jimmy Heath', 'Josh Davis'],
    },
    service: 'Apple Fitness+',
    createdAt: '2021-01-28T14:39:56.407144',
    priority: 'High',
    taskStatus: 'Open',
    sla: '2021-02-02T14:39:00',
    source: 'Turntable',
    requests: 1,
    researcher: null,
    createdBy: 'Nenad Mirkoski',
    parkedDate: null,
    isParked: null,
    worldwide: {
      status: 'Available',
      multipleCountries: 0,
    },
  },
  {
    id: 102380,
    adamId: '255991760',
    song: {
      name: 'Never Gonna Give You Up',
      artist: 'Rick Astley',
      appleUrl: 'https://music.apple.com/gb/album/never-gonna-give-you-up/255991758?i=255991760',
      isrc: 'GBARL9300135',
      iswc: null,
      composers: ['Matt Aitken', 'Mike Stock', 'Peter Waterman'],
    },
    service: 'Apple Fitness+',
    createdAt: '2021-01-28T14:39:57.175531',
    priority: 'High',
    taskStatus: 'Open',
    sla: '2021-02-02T14:39:00',
    source: 'Turntable',
    requests: 1,
    researcher: null,
    createdBy: 'Nenad Mirkoski',
    parkedDate: null,
    isParked: null,
    worldwide: {
      status: 'Non-Available',
      multipleCountries: 0,
    },
  },
  {
    id: 102379,
    adamId: '1440746111',
    song: {
      artist: 'Drake',
      appleUrl: 'https://music.apple.com/us/album/crew-love-feat-the-weeknd/1440745498?i=1440746111',
      isrc: 'USCM51100551',
      iswc: null,
      composers: ['A. Graham', 'A. Tesfaye', 'Anthony Palman', 'C. Montagnese', 'N. Shebib'],
    },
    service: 'Apple Fitness+',
    createdAt: '2021-01-28T14:39:56.367317',
    priority: 'High',
    taskStatus: 'Open',
    source: 'Turntable',
    requests: 1,
    researcher: null,
    createdBy: 'Nenad Mirkoski',
    parkedDate: new Date(),
    isParked: null,
    worldwide: {
      status: 'Unknown',
      multipleCountries: 0,
    },
  },
  {
    id: 102381,
    adamId: '255991760',
    service: 'Apple Fitness+',
    createdAt: '2021-01-28T14:39:57.175531',
    priority: 'High',
    taskStatus: 'Open',
    sla: '2021-02-02T14:39:00',
    source: 'Turntable',
    requests: 1,
    researcher: null,
    createdBy: 'Nenad Mirkoski',
    parkedDate: null,
    isParked: null,
    worldwide: {
      status: 'Multiple',
      multipleCountries: 3,
    },
  },
  {
    id: 102380,
    adamId: '255991760',
    service: 'Apple Fitness+',
    createdAt: '2021-01-28T14:39:57.175531',
    priority: 'High',
    taskStatus: 'Open',
    sla: '2021-02-02T14:39:00',
    source: 'Turntable',
    requests: 1,
    researcher: null,
    createdBy: 'Nenad Mirkoski',
    parkedDate: null,
    isParked: null,
    worldwide: {
      status: 'NONE',
      multipleCountries: 0,
    },
  },
];

const maps = {
  storefronts: {
    loading: false,
    items: [
      {
        id: 1,
        name: 'Worldwide',
      },
      {
        id: 120,
        name: 'Algeria',
      },
      {
        id: 121,
        name: 'Angola',
      },
      {
        id: 96,
        name: 'Anguilla',
      },
    ],
  },
  availabilities: {
    loading: false,
    items: [
      {
        id: 1,
        availability: 'Available',
      },
      {
        id: 2,
        availability: 'Non-Available',
      },
      {
        id: 3,
        availability: 'Unknown',
      },
    ],
  },
  services: {
    loading: false,
    items: [
      {
        id: 1,
        name: 'Apple Fitness+',
      },
    ],
  },
  roles: {
    loading: false,
    composers: [
      {
        id: 1,
        role: 'Composer',
      },
      {
        id: 2,
        role: 'Author',
      },
      {
        id: 3,
        role: 'Composer/Author',
      },
      {
        id: 4,
        role: 'Arranger',
      },
    ],
    publishers: [
      {
        id: 1,
        role: 'Publisher',
      },
      {
        id: 2,
        role: 'Original Publisher',
      },
      {
        id: 3,
        role: 'Sub-Publisher',
      },
    ],
  },
  sources: {
    loading: false,
    items: [
      {
        id: 180,
        name: 'Manual',
      },
      {
        id: 1,
        name: 'Turntable',
      },
    ],
  },
  priorities: {
    loading: false,
    items: [
      {
        id: 1,
        priority: 'High',
      },
      {
        id: 2,
        priority: 'Normal',
      },
      {
        id: 3,
        priority: 'Low',
      },
    ],
  },
  statuses: {
    loading: false,
    items: [
      {
        id: 'OPEN',
        name: 'Open',
      },
      {
        id: 'IN_PROGRESS',
        name: 'In Progress',
      },
      {
        id: 'CLOSED',
        name: 'Closed',
        randomNotValid: 'N0TV@L!D',
        randomNotValid2: 'N0TV@L!D2',
      },
    ],
  },
};

const projects = [
  { id: 1, name: 'Project 1', serviceId: 1, permissions: ['TASK'] },
  { id: 2, name: 'Project 2', serviceId: 2, permissions: ['TASK', 'AGREEMENT'] },
  { id: 3, name: 'Project 3', serviceId: 1, permissions: ['AGREEMENT'] },
];

const taskActiveProjects = [
  { id: 1, name: 'Project 1' },
  { id: 2, name: 'Project 2' },
];

const agreementsProjects = [{ id: 3, name: 'Project 3' }];

afterEach(() => jest.clearAllMocks());

describe('Task List Table', () => {
  test('should render row for each task', () => {
    const REDUX_STATE = {
      projects: {
        list: [...projects],
        taskActiveProjects: [...taskActiveProjects],
        agreementsProjects: [...agreementsProjects],
      },
      dashboard: { tasks: DUMMY_TASKS_DATA, params: { page: 0, size: 20, filters: [], advancedFilters: [] } },
      user: { isActive: true },
      maps,
    };

    const wrappedComponent = customReduxWrapper(<TaskListTable />, REDUX_STATE);

    render(wrap(wrappedComponent.component).with(wrappers.theme));

    expect(screen.getAllByTestId('task-list-table-row')).toHaveLength(DUMMY_TASKS_DATA.length);
  });

  test('should redirect to task on row click', () => {
    const REDUX_STATE = {
      projects: {
        list: [...projects],
      },
      dashboard: { tasks: DUMMY_TASKS_DATA, params: { page: 0, size: 20, filters: [], advancedFilters: [] } },
      user: { isActive: true },
      maps,
    };

    const wrappedComponent = customReduxWrapper(<TaskListTable />, REDUX_STATE);

    render(wrap(wrappedComponent.component).with(wrappers.theme));

    const rows = screen.getAllByTestId('task-list-table-row');

    fireEvent.click(rows[2]);

    expect(mockedPush).toBeCalledTimes(1);
    expect(mockedPush).toBeCalledWith(`/tasks/${DUMMY_TASKS_DATA[2].id}`);
  });

  test('Should reset tasks on unmount', async () => {
    const REDUX_STATE = {
      projects: {
        list: [...projects],
      },
      dashboard: { tasks: [], params: { page: 0, size: 20, filters: [], advancedFilters: [] } },
      user: { isActive: true },
      maps,
    };

    const wrappedComponent = customReduxWrapper(<TaskListTable />, REDUX_STATE);

    const { unmount } = render(wrap(wrappedComponent.component).with(wrappers.theme));

    expect(wrappedComponent.dispatch).toBeCalled();

    unmount();

    expect(wrappedComponent.dispatch).toBeCalledTimes(2);

    expect(wrappedComponent.dispatch.mock.calls[0]).toEqual([projectsReducer.actions.taskActiveProjects.initial()]);
    expect(wrappedComponent.dispatch.mock.calls[1]).toEqual([dashboard.actions.resetTable()]);
    // expect(wrappedComponent.dispatch.mock.calls[2]).toEqual([projectsReducer.actions.reset()]);
  });

  test('should be able to handle sort', async () => {
    const REDUX_STATE = {
      projects: {
        taskActiveProjects: [...projects],
      },
      dashboard: { tasks: [], params: { page: 0, size: 20, filters: [], advancedFilters: [] } },
      user: { isActive: true },
      maps,
    };

    const wrappedComponent = customReduxWrapper(<TaskListTable />, REDUX_STATE);

    render(wrap(wrappedComponent.component).with(wrappers.theme));

    wrappedComponent.dispatch.mockReset();

    const sortByArtist = screen.getByText('Artist');

    fireEvent.click(sortByArtist);

    expect(wrappedComponent.dispatch).toBeCalledTimes(2);
    expect(wrappedComponent.dispatch.mock.calls[0]).toEqual([
      dashboard.actions.updateParams({ prop: 'sort', value: [{ name: 'artistName', value: 'desc' }] }),
    ]);
    expect(wrappedComponent.dispatch.mock.calls[1]).toEqual([dashboard.actions.resetTable()]);
  });

  test('should be able to handle requests sort when priority sort is clicked', async () => {
    const REDUX_STATE = {
      projects: {
        taskActiveProjects: [...projects],
      },
      dashboard: { tasks: [], params: { page: 0, size: 20, filters: [], advancedFilters: [], sort: [] } },
      user: { isActive: true },
      maps,
    };

    const wrappedComponent = customReduxWrapper(<TaskListTable />, REDUX_STATE);

    render(wrap(wrappedComponent.component).with(wrappers.theme));

    wrappedComponent.dispatch.mockReset();

    const sortByPriority = screen.getByText('Priority');

    fireEvent.click(sortByPriority);

    expect(wrappedComponent.dispatch).toBeCalledTimes(2);
    expect(wrappedComponent.dispatch.mock.calls[0]).toEqual([
      dashboard.actions.updateParams({
        prop: 'sort',
        value: [
          { name: 'priority', value: 'desc' },
          { name: 'requests', value: 'asc' },
        ],
      }),
    ]);
    expect(wrappedComponent.dispatch.mock.calls[1]).toEqual([dashboard.actions.resetTable()]);
  });

  test('should be able to reverse sort for requests', async () => {
    const REDUX_STATE = {
      projects: {
        taskActiveProjects: [...projects],
      },
      dashboard: {
        tasks: [],
        params: {
          page: 0,
          size: 20,
          filters: [],
          advancedFilters: [],
          sort: [
            { name: 'priority', value: 'desc' },
            { name: 'requests', value: 'asc' },
          ],
        },
      },
      user: { isActive: true },
      maps,
    };

    const wrappedComponent = customReduxWrapper(<TaskListTable />, REDUX_STATE);

    render(wrap(wrappedComponent.component).with(wrappers.theme));

    wrappedComponent.dispatch.mockReset();

    const sortByPriority = screen.getByText('Priority');

    fireEvent.click(sortByPriority);

    expect(wrappedComponent.dispatch).toBeCalledTimes(2);
    expect(wrappedComponent.dispatch.mock.calls[0]).toEqual([
      dashboard.actions.updateParams({
        prop: 'sort',
        value: [
          { name: 'priority', value: 'asc' },
          { name: 'requests', value: 'desc' },
        ],
      }),
    ]);
    expect(wrappedComponent.dispatch.mock.calls[1]).toEqual([dashboard.actions.resetTable()]);
  });

  test('should be able to clear requests sort when priority sort is cleared', async () => {
    const REDUX_STATE = {
      projects: {
        taskActiveProjects: [...projects],
      },
      dashboard: {
        tasks: [],
        params: {
          page: 0,
          size: 20,
          filters: [],
          advancedFilters: [],
          sort: [
            { name: 'priority', value: 'asc' },
            { name: 'requests', value: 'desc' },
          ],
        },
      },
      user: { isActive: true },
      maps,
    };

    const wrappedComponent = customReduxWrapper(<TaskListTable />, REDUX_STATE);

    render(wrap(wrappedComponent.component).with(wrappers.theme));

    wrappedComponent.dispatch.mockReset();

    const sortByPriority = screen.getByText('Priority');

    fireEvent.click(sortByPriority);

    expect(wrappedComponent.dispatch).toBeCalledTimes(2);
    expect(wrappedComponent.dispatch.mock.calls[0]).toEqual([
      dashboard.actions.updateParams({
        prop: 'sort',
        value: [],
      }),
    ]);
    expect(wrappedComponent.dispatch.mock.calls[1]).toEqual([dashboard.actions.resetTable()]);
  });

  test('should be able to handle search', async () => {
    const REDUX_STATE = {
      projects: {
        list: [...projects],
      },
      dashboard: { tasks: [], params: { page: 0, size: 20, filters: [], advancedFilters: [] } },
      user: { isActive: true },
      maps,
    };

    const wrappedComponent = customReduxWrapper(<TaskListTable />, REDUX_STATE);

    render(wrap(wrappedComponent.component).with(wrappers.theme));

    wrappedComponent.dispatch.mockReset();

    const search = screen.getByTestId('task-list-table-search');

    userEvent.type(search, 'new-search');

    await waitFor(() => {
      expect(wrappedComponent.dispatch).toBeCalledTimes(2);
      expect(wrappedComponent.dispatch.mock.calls[0]).toEqual([
        dashboard.actions.updateParams({ prop: 'search', value: 'new-search' }),
      ]);
      expect(wrappedComponent.dispatch.mock.calls[1]).toEqual([dashboard.actions.resetTable()]);
    });
  });

  test('should be able to filter change', async () => {
    const REDUX_STATE = {
      projects: {
        list: [...projects],
      },
      dashboard: { tasks: [], params: { page: 0, size: 20, filters: [], advancedFilters: [] } },
      user: { isActive: true },
      maps,
    };

    const wrappedComponent = customReduxWrapper(<TaskListTable />, REDUX_STATE);

    render(wrap(wrappedComponent.component).with(wrappers.theme));

    wrappedComponent.dispatch.mockReset();

    userEvent.click(screen.getByText('Add Filter'));
    userEvent.click(screen.queryAllByTestId('choice-title')[0]);
    userEvent.click(screen.getByText('Open'));
    userEvent.click(screen.getByTestId('button-confirm'));

    expect(wrappedComponent.dispatch).toBeCalledTimes(2);
    expect(wrappedComponent.dispatch.mock.calls[0]).toEqual([
      dashboard.actions.updateParams({
        prop: 'filters',
        value: [
          {
            operator: 'in',
            title: 'Status',
            value: 'status',
            values: [
              {
                title: 'Open',
                value: 'OPEN',
              },
            ],
          },
        ],
      }),
    ]);
    expect(wrappedComponent.dispatch.mock.calls[1]).toEqual([dashboard.actions.resetTable()]);
  });

  test('should display parked end date if only closed filter is selected', () => {
    const REDUX_STATE = {
      projects: {
        list: [...projects],
      },
      dashboard: {
        tasks: DUMMY_TASKS_DATA,
        params: {
          page: 0,
          size: 20,
          search: '',
          filters: [
            {
              value: 'status',
              title: 'Status',
              values: [{ title: 'Closed', value: 'CLOSED' }],
            },
            {
              value: 'service',
              title: 'Service',
              values: [{ title: 'Apple Fitness+', value: '1' }],
            },
          ],
          advancedFilters: [],
        },
      },
      user: { isActive: true },
      maps,
    };

    const wrappedComponent = customReduxWrapper(<TaskListTable />, REDUX_STATE);

    render(wrap(wrappedComponent.component).with(wrappers.theme));

    const items = screen.queryAllByTestId('table-header-item');

    expect(items.map((item) => item.textContent.trim().toUpperCase()).includes('PARKED END DATE')).toBe(true);
    expect(items.map((item) => item.textContent.trim().toUpperCase()).includes('DUE DATE')).toBe(false);
  });

  test('should not display parked end date if filters other then status are selected', () => {
    const REDUX_STATE = {
      projects: {
        list: [...projects],
      },
      dashboard: {
        tasks: DUMMY_TASKS_DATA,
        params: {
          page: 0,
          size: 20,
          search: '',
          filters: [
            {
              value: 'service',
              title: 'Service',
              values: [{ title: 'Apple Fitness+', value: '1' }],
            },
          ],
          advancedFilters: [],
        },
      },
      user: { isActive: true },
      maps,
    };

    const wrappedComponent = customReduxWrapper(<TaskListTable />, REDUX_STATE);

    render(wrap(wrappedComponent.component).with(wrappers.theme));

    const items = screen.queryAllByTestId('table-header-item');

    expect(items.map((item) => item.textContent.trim().toUpperCase()).includes('PARKED END DATE')).toBe(false);
  });
});
