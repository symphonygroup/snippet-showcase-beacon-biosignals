import { organizationSkillsSlice as OrganizationSkillsSlice, initialState, createSkill } from "./organizationSkills";
import MockAdapter from 'axios-mock-adapter';
import { http } from "../../../api";
import { store } from "../../store";

const name = 'organizationSkills';

describe('OrganizationSkillsSlice', () => {
  test('Initialize slice with initialValue', () => {
    const organizationSkillsSliceInit = OrganizationSkillsSlice.reducer(initialState, { type: "unknown" });
    expect(organizationSkillsSliceInit).toBe(initialState);
  });

  test('Should create a new skill', async () => {
    const skill = { skillName: 'ReactJS', infoLink: 'https://reactjs.org/' };
    const mock = new MockAdapter(http);
    mock.onPost('/admin/skills/create').reply(200);
    const result = await store.dispatch(createSkill(skill));

    expect(result.type).toBe(`${name}/createSkill/fulfilled`);

    mock.onPost('/admin/skills/create').reply(500);
    const resultRejected = await store.dispatch(createSkill(skill));
    expect(resultRejected.type).toBe(`${name}/createSkill/rejected`);
  });
});
