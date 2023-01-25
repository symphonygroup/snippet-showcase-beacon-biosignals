import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { wrap, wrappers } from '../../utils-tests';
import Organization from './Organization';
import { OrganizationTabs } from '../../api/types';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () =>
    jest.fn().mockImplementation(() => Promise.resolve({ title: 'test' })),
}));

describe('Organization', () => {
  const reduxState = {
    organizationSkills: {
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
    organizationEmployees: {
      list: [],
      hasMore: true,
      params: {
        page: 0,
        size: 20,
        sort: [],
        search: '',
        includeDeactivated: true,
      },
      loading: false,
      error: null,
      status: '',
    },
  };

  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  test('Should be able to render Organization page', () => {
    render(wrap(<Organization />).with(wrappers.redux(reduxState)));

    expect(screen.getByText('Organization')).toBeDefined();
  });

  test('Should call setSelectedTab function', () => {
    render(wrap(<Organization />).with(wrappers.redux(reduxState)));

    const selectTab = screen.getByTestId(
      `organization-tab-${OrganizationTabs.Skills}`
    );

    expect(selectTab).toBeInTheDocument();

    fireEvent.click(selectTab);
  });

  test('Should open Invite Employees modal and call sendInvite function', () => {
    render(
      wrap(<Organization />).with(
        wrappers.memoryRouter,
        wrappers.redux(reduxState)
      )
    );

    const selectTab = screen.getByTestId(
      `organization-tab-${OrganizationTabs.Employees}`
    );

    expect(selectTab).toBeInTheDocument();

    fireEvent.click(selectTab);

    const inviteEmployeesButton = screen.getByTestId(
      'organization-invite-employees-button'
    );

    expect(inviteEmployeesButton).toBeInTheDocument();

    fireEvent.click(inviteEmployeesButton);

    const inviteEmployeesModalInput = screen.getByTestId(
      'organization-invite-modal-inputContainer'
    ).childNodes[0].childNodes[2];

    expect(inviteEmployeesModalInput).toBeInTheDocument();

    fireEvent.keyDown(inviteEmployeesModalInput, {
      target: { value: ['john.doe@symphony.is', 'test@symphony.is'] },
    });
    fireEvent.focusOut(inviteEmployeesModalInput);

    const inviteEmployeesModalRemoveEmail = screen.getByTestId(
      'organization-invite-modal-inputContainer'
    ).childNodes[0].childNodes[1].childNodes[0].childNodes[1];

    expect(inviteEmployeesModalRemoveEmail).toBeInTheDocument();

    fireEvent.click(inviteEmployeesModalRemoveEmail);

    const inviteEmployeesModalSendButton = screen.getByTestId(
      'organization-invite-employees-modal-footer-sendInvite-button'
    );

    expect(inviteEmployeesModalSendButton).toBeInTheDocument();

    fireEvent.click(inviteEmployeesModalSendButton);
  });

  test('Should open Invite Employees modal and call onClose function', () => {
    render(
      wrap(<Organization />).with(
        wrappers.memoryRouter,
        wrappers.redux(reduxState)
      )
    );

    const selectTab = screen.getByTestId(
      `organization-tab-${OrganizationTabs.Employees}`
    );

    expect(selectTab).toBeInTheDocument();

    fireEvent.click(selectTab);

    const inviteEmployeesButton = screen.getByTestId(
      'organization-invite-employees-button'
    );

    expect(inviteEmployeesButton).toBeInTheDocument();

    fireEvent.click(inviteEmployeesButton);

    const inviteEmployeesModalCloseButton = screen.getByTestId(
      'organization-invite-employees-modal-overlay'
    );

    expect(inviteEmployeesModalCloseButton).toBeInTheDocument();

    fireEvent.click(inviteEmployeesModalCloseButton);

    fireEvent.click(inviteEmployeesButton);

    const inviteEmployeesModalFooterCancelButton = screen.getByTestId(
      'organization-invite-employees-modal-footer-cancel-button'
    );

    expect(inviteEmployeesModalFooterCancelButton).toBeInTheDocument();

    fireEvent.click(inviteEmployeesModalFooterCancelButton);

    fireEvent.click(inviteEmployeesButton);
  });

  test('Should open Create New Skill modal and call handleSaveAndCreate and handleSave functions', () => {
    render(
      wrap(<Organization />).with(
        wrappers.memoryRouter,
        wrappers.redux(reduxState)
      )
    );

    const selectTab = screen.getByTestId(
      `organization-tab-${OrganizationTabs.Skills}`
    );

    expect(selectTab).toBeInTheDocument();

    fireEvent.click(selectTab);

    const createNewSkillButton = screen.getByTestId(
      'organization-create-new-skill-button'
    );

    expect(createNewSkillButton).toBeInTheDocument();

    fireEvent.click(createNewSkillButton);

    const createNewSkillModalSkillNameInput = screen.getByTestId(
      'organization-create-new-skill-modal-skill-name-input'
    );

    expect(createNewSkillModalSkillNameInput).toBeInTheDocument();

    fireEvent.change(createNewSkillModalSkillNameInput, {
      target: { value: 'ReactJS' },
    });

    const createNewSkillModalInfoLinkInput = screen.getByTestId(
      'organization-create-new-skill-modal-info-link-input'
    );

    expect(createNewSkillModalInfoLinkInput).toBeInTheDocument();

    fireEvent.change(createNewSkillModalInfoLinkInput, {
      target: { value: 'https://reactjs.org/' },
    });

    const createNewSkillModalSaveAndCreateNewButton = screen.getByTestId(
      'organization-create-new-skill-modal-footer-saveAndCreateNew-button'
    );

    expect(createNewSkillModalSaveAndCreateNewButton).toBeInTheDocument();

    fireEvent.click(createNewSkillModalSaveAndCreateNewButton);

    fireEvent.change(createNewSkillModalSkillNameInput, {
      target: { value: 'ReactJS' },
    });

    fireEvent.change(createNewSkillModalInfoLinkInput, {
      target: { value: 'reactjs.org' },
    });

    fireEvent.change(createNewSkillModalInfoLinkInput, {
      target: { value: 'app://test.com/' },
    });

    fireEvent.change(createNewSkillModalInfoLinkInput, {
      target: { value: 'https://reactjs.org/' },
    });

    const createNewSkillModalSaveButton = screen.getByTestId(
      'organization-create-new-skill-modal-footer-save-button'
    );

    expect(createNewSkillModalSaveButton).toBeInTheDocument();

    fireEvent.click(createNewSkillModalSaveButton);
  });

  test('Should open Create New Skill modal and call onClose function', () => {
    render(
      wrap(<Organization />).with(
        wrappers.memoryRouter,
        wrappers.redux(reduxState)
      )
    );

    const selectTab = screen.getByTestId(
      `organization-tab-${OrganizationTabs.Skills}`
    );

    expect(selectTab).toBeInTheDocument();

    fireEvent.click(selectTab);

    const createNewSkillButton = screen.getByTestId(
      'organization-create-new-skill-button'
    );

    expect(createNewSkillButton).toBeInTheDocument();

    fireEvent.click(createNewSkillButton);

    const CreateNewSkillModalCloseButton = screen.getByTestId(
      'organization-create-new-skill-modal-overlay'
    );

    expect(CreateNewSkillModalCloseButton).toBeInTheDocument();

    fireEvent.click(CreateNewSkillModalCloseButton);

    fireEvent.click(createNewSkillButton);

    const CreateNewSkillModalFooterCancelButton = screen.getByTestId(
      'organization-create-new-skill-modal-footer-cancel-button'
    );

    expect(CreateNewSkillModalFooterCancelButton).toBeInTheDocument();

    fireEvent.click(CreateNewSkillModalFooterCancelButton);

    fireEvent.click(createNewSkillButton);
  });

  test('Should open Create New Skill Groups modal and call handleCreate function', () => {
    render(
      wrap(<Organization />).with(
        wrappers.memoryRouter,
        wrappers.redux(reduxState)
      )
    );

    const selectTab = screen.getByTestId(
      `organization-tab-${OrganizationTabs.SkillGroups}`
    );

    expect(selectTab).toBeInTheDocument();

    fireEvent.click(selectTab);

    const createNewSkillGroupButton = screen.getByTestId(
      'organization-create-new-skill-group-button'
    );

    expect(createNewSkillGroupButton).toBeInTheDocument();

    fireEvent.click(createNewSkillGroupButton);

    const createNewSkillGroupModalSkillGroupNameInput = screen.getByTestId(
      'organization-create-new-skill-group-modal-skill-group-name-input'
    );

    expect(createNewSkillGroupModalSkillGroupNameInput).toBeInTheDocument();

    fireEvent.change(createNewSkillGroupModalSkillGroupNameInput, {
      target: { value: 'Front end' },
    });

    const createNewSkillGroupModalCreateButton = screen.getByTestId(
      'organization-create-new-skill-group-modal-footer-create-button'
    );

    expect(createNewSkillGroupModalCreateButton).toBeInTheDocument();

    fireEvent.click(createNewSkillGroupModalCreateButton);
  });

  test('Should open Create New Skill Groups modal and call handleClose function', () => {
    render(
      wrap(<Organization />).with(
        wrappers.memoryRouter,
        wrappers.redux(reduxState)
      )
    );

    const selectTab = screen.getByTestId(
      `organization-tab-${OrganizationTabs.SkillGroups}`
    );

    expect(selectTab).toBeInTheDocument();

    fireEvent.click(selectTab);

    const createNewSkillGroupButton = screen.getByTestId(
      'organization-create-new-skill-group-button'
    );

    expect(createNewSkillGroupButton).toBeInTheDocument();

    fireEvent.click(createNewSkillGroupButton);

    const CreateNewSkillGroupModalFooterCancelButton = screen.getByTestId(
      'organization-create-new-skill-group-modal-footer-cancel-button'
    );

    expect(CreateNewSkillGroupModalFooterCancelButton).toBeInTheDocument();

    fireEvent.click(CreateNewSkillGroupModalFooterCancelButton);
  });
});
