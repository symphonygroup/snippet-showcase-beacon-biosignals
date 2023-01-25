import {
  organizationSkillGroupsSlice as OrganizationSkillGroupsSlice,
  initialState,
  createSkillGroup,
} from './organizationSkillGroups';
import MockAdapter from 'axios-mock-adapter';
import { http } from '../../../api';
import { store } from '../../store';

const name = 'organizationSkillGroups';

describe('OrganizationSkillGroupsSlice', () => {
  test('Initialize slice with initialValue', () => {
    const organizationSkillGroupsSliceInit =
      OrganizationSkillGroupsSlice.reducer(initialState, { type: 'unknown' });
    expect(organizationSkillGroupsSliceInit).toBe(initialState);
  });

  test('Should create a new skill group', async () => {
    const group: any = {
      skillGroupName: 'ReactJS',
      skills: [{ value: 'React', label: 'React' }],
    };
    const mock = new MockAdapter(http);
    mock.onPost('/admin/skill/group/create').reply(200);
    const result = await store.dispatch(createSkillGroup(group));

    expect(result.type).toBe(`${name}/createSkillGroup/fulfilled`);

    mock.onPost('/admin/skill/group/create').reply(500);
    const resultRejected = await store.dispatch(createSkillGroup(group));
    expect(resultRejected.type).toBe(`${name}/createSkillGroup/rejected`);
  });
});
