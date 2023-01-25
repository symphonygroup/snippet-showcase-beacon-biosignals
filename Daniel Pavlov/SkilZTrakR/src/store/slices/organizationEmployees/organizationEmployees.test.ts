import { organizationEmployeeSlice as OrganizationEmployeeSlice, initialState, getAll, inviteEmployees, updateParams, resetTable, initialParams } from "./organizationEmployees";
import MockAdapter from 'axios-mock-adapter';
import { http } from "../../../api";
import { store } from "../../store";

const name = 'organizationEmployee';

describe('OrganizationEmployeeSlice', () => {
  test('Initialize slice with initialValue', () => {
    const organizationEmployeeSliceInit = OrganizationEmployeeSlice.reducer(initialState, { type: "unknown" });
    expect(organizationEmployeeSliceInit).toBe(initialState);
  });

  test('Should get list of all employees', async () => {
    const data: any = {
      content: [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@symphony.is',
          image: null,
          role: null,
          skills: [],
          status: 'INVITED',
        },
      ],
    };
    const mock = new MockAdapter(http);
    mock.onGet('/admin/employees/all').reply(200, data);
    const result = await store.dispatch(getAll(initialState.params));

    expect(result.type).toBe(`${name}/getAll/fulfilled`);

    mock.onGet('/admin/employees/all').reply(500);
    const resultRejected = await store.dispatch(getAll(initialState.params));
    expect(resultRejected.type).toBe(`${name}/getAll/rejected`);
  });

  test('Should invite employees', async () => {
    const emails = ['john.doe@symphony.is'];
    const mock = new MockAdapter(http);
    mock.onPost('/admin/employees/invite').reply(200);
    const result = await store.dispatch(inviteEmployees(emails));

    expect(result.type).toBe(`${name}/inviteEmployees/fulfilled`);

    mock.onPost('/admin/employees/invite').reply(500);
    const resultRejected = await store.dispatch(inviteEmployees(emails));
    expect(resultRejected.type).toBe(`${name}/inviteEmployees/rejected`);
  });

  test('Should update params', () => {
    const afterReducerOperation = OrganizationEmployeeSlice.reducer(
      initialState,
      updateParams({ prop: 'page', value: 1 })
    );

    expect(afterReducerOperation).toStrictEqual({
      ...initialState,
      params: { ...initialParams, page: 1 }
    });
  });

  test('Should reset table', () => {
    const afterReducerOperation = OrganizationEmployeeSlice.reducer(
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
