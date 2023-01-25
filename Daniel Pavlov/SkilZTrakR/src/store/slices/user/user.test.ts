import { userSlice as UserSlice, initialState, signIn, signOut } from "./user";
import MockAdapter from 'axios-mock-adapter';
import { http } from "../../../api";
import { store } from "../../store";

const name = 'user';

describe('UserSlice', () => {
  test('Initialize slice with initialValue', () => {
    const userSliceInit = UserSlice.reducer(initialState, { type: "unknown" });
    expect(userSliceInit).toBe(initialState);
  });

  test('Should login and get current user', async () => {
    const data: any = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@symhpony.is',
      image: '',
      status: '',
      role: 'ROLE_ADMIN',
    }
    const mock = new MockAdapter(http);
    mock.onGet('/login').reply(200, data);
    const result = await store.dispatch(signIn(''));
    const user: any = result.payload;

    expect(result.type).toBe(`${name}/login/fulfilled`);
    expect(user.data.email).toEqual(data.email);

    mock.onGet('/login').reply(500);
    const resultRejected = await store.dispatch(signIn(''));
    expect(resultRejected.type).toBe(`${name}/login/rejected`);
  });

  test('Should logout current user', async () => {
    const mock = new MockAdapter(http);
    mock.onPost('/logout').reply(200);
    const result = await store.dispatch(signOut());

    expect(result.type).toBe(`${name}/logout/fulfilled`);

    mock.onPost('/logout').reply(500);
    const resultRejected = await store.dispatch(signOut());
    expect(resultRejected.type).toBe(`${name}/logout/rejected`);
  });
});
