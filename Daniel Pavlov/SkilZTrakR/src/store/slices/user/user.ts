import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api';
import { UserSliceState } from '../../../api/types';

const name = 'user';

export const initialState: UserSliceState = {
  firstName: '',
  lastName: '',
  email: '',
  image: '',
  status: '',
  role: '',
  loading: false,
  error: null,
};

export const signIn = createAsyncThunk(`${name}/login`, async (params: any) => {
  const response = await api.auth.login(params);
  return response;
});

export const signOut = createAsyncThunk(`${name}/logout`, async () => {
  const response = await api.auth.logout();
  return response;
});

const UserSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload.data,
          loading: false,
        };
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload.data,
          loading: false,
        };
      })
      .addCase(signOut.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export const userSlice = UserSlice;
