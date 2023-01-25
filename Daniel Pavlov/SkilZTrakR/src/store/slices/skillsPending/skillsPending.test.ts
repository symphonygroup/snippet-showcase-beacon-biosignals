import { skillsPendingSlice as SkillsPendingSlice, initialState, getAll, updateParams, resetTable, initialParams } from './skillsPending';
import MockAdapter from 'axios-mock-adapter';
import { http } from "../../../api";
import { store } from "../../store";

const name = 'skillsPending';

describe('SkillsPendingSlice', () => {
  test('Initialize slice with initialValue', () => {
    const skillsPendingSliceInit = SkillsPendingSlice.reducer(initialState, { type: "unknown" });
    expect(skillsPendingSliceInit).toBe(initialState);
  });

  test('Should get list of all skills', async () => {
    const data: any = {
      content: [
        {
          name: 'ReactJS',
          levelOfExpertise: 4,
          skillGroups: [],
          status: 'Pending',
        },
      ],
    };
    const mock = new MockAdapter(http);
    mock.onGet('/employee/skills/pending').reply(200, data);
    const result = await store.dispatch(getAll(initialState.params));
    const user: any = result.payload;

    expect(result.type).toBe(`${name}/getAll/fulfilled`);
    expect(user.data.email).toEqual(data.email);

    mock.onGet('/employee/skills/pending').reply(500);
    const resultRejected = await store.dispatch(getAll(initialState.params));
    expect(resultRejected.type).toBe(`${name}/getAll/rejected`);
  });

  test('Should update params', () => {
    const afterReducerOperation = SkillsPendingSlice.reducer(
      initialState,
      updateParams({ prop: 'page', value: 1 })
    );

    expect(afterReducerOperation).toStrictEqual({
      ...initialState,
      params: { ...initialParams, page: 1 }
    });
  });

  test('Should reset table', () => {
    const afterReducerOperation = SkillsPendingSlice.reducer(
      initialState,
      resetTable()
    );

    expect(afterReducerOperation).toStrictEqual({
      ...initialState,
      list: initialState.list,
      hasMore: initialState.hasMore,
      loading: initialState.loading,
      params: { ...initialParams, page: 0 }
    });
  });
});
