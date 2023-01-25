import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { customReduxWrapper, wrap, wrappers } from '../../../../utils-tests';
import SkillsPendingTable from '.';

describe('SkillsPendingTable', () => {
  const REDUX_STATE = {
    user: {
      email: 'admin@symphony.is',
    },
    skillsPending: {
      list: [
        {
          name: 'ReactJS',
          levelOfExpertise: 3,
          skillGroups: ['Front end'],
          assessmentStatus: 'Pending',
        },
        {
          name: 'Java',
          levelOfExpertise: 0,
          skillGroups: ['Backend'],
          assessmentStatus: 'Pending',
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

  test('Should render row for each skill', () => {
    render(wrap(<SkillsPendingTable />).with(wrappers.redux(REDUX_STATE)));

    expect(screen.getAllByTestId('skills-pending-table-row')).toHaveLength(
      REDUX_STATE.skillsPending.list.length
    );
  });

  test('Should be able to handle sort', async () => {
    const wrappedComponent = customReduxWrapper(
      <SkillsPendingTable />,
      REDUX_STATE
    );

    render(wrap(<SkillsPendingTable />).with(wrappers.redux(REDUX_STATE)));

    wrappedComponent.dispatch.mockReset();

    const sortBySkill = screen.getByText('Skill');

    fireEvent.click(sortBySkill);
  });

  test('Should call handleSelectAll function', () => {
    render(wrap(<SkillsPendingTable />).with(wrappers.redux(REDUX_STATE)));

    const selectAllCheckboxLabel = screen.getByTestId('table-header-checkbox');
    const selectAllCheckbox = selectAllCheckboxLabel.childNodes[0];

    expect(selectAllCheckbox).toBeInTheDocument();

    fireEvent.click(selectAllCheckbox, { target: { checked: false } });
    fireEvent.click(selectAllCheckbox, { target: { checked: true } });
  });

  test('Should call handleSetCheckedItems function', () => {
    render(wrap(<SkillsPendingTable />).with(wrappers.redux(REDUX_STATE)));

    const checkRowItem = screen.getByTestId(
      `skills-pending-table-row-checkbox-${REDUX_STATE.skillsPending.list[0].name}`
    );

    expect(checkRowItem).toBeInTheDocument();

    fireEvent.click(checkRowItem, { target: { checked: false } });
    fireEvent.click(checkRowItem, { target: { checked: true } });
  });

  test('Should call updateHoverRating function', () => {
    render(wrap(<SkillsPendingTable />).with(wrappers.redux(REDUX_STATE)));

    const skillsPendingTableUpdateHoverRating = screen.getByTestId(
      `skills-pending-table-update-hover-rating-${REDUX_STATE.skillsPending.list[0].name}-1`
    );

    expect(skillsPendingTableUpdateHoverRating).toBeInTheDocument();

    fireEvent.mouseEnter(skillsPendingTableUpdateHoverRating);
    fireEvent.mouseLeave(skillsPendingTableUpdateHoverRating);
  });
});
