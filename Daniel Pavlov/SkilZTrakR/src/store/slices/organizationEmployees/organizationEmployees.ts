import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api';
import { URLParams } from '../../../types/params';
import URLParamsConvertor from '../../../utils/URLParamsConvertor';

const name = 'organizationEmployee';

export const initialParams: URLParams = {
  page: 0,
  size: 20,
  sort: [],
  search: '',
  includeDeactivated: false,
};

export const initialState: any = {
  list: [],
  hasMore: true,
  params: initialParams,
  loading: false,
  error: null,
};

export const getAll = createAsyncThunk(`${name}/getAll`, async (params: URLParams) => {
  const response = await api.organization.allEmployees(URLParamsConvertor(params));
  return response;
});

export const inviteEmployees = createAsyncThunk(
  `${name}/inviteEmployees`,
  async (emails: string[]) => {
    const response = await api.organization.inviteEmployees({
      employeeEmails: emails,
    });
    return response.data;
  }
);

const OrganizationEmployeeSlice = createSlice({
  name,
  initialState,
  reducers: {
    updateParams: (state, { payload }) => {
      state.params = { ...state.params, [payload.prop]: payload.value };
    },
    resetTable: (state) => {
      state.list = initialState.list;
      state.hasMore = initialState.hasMore;
      state.loading = initialState.loading;
      state.params.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAll.fulfilled, (state, action: any) => {
        state.list = [ ...state.list, ...action.payload.data.content ];
        state.hasMore = !action.payload.data.last;
        state.loading = false;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.hasMore = false;
      })
      .addCase(inviteEmployees.pending, (state, action) => {
        state.loading = true;
        state.emails = action.meta.arg;
      })
      .addCase(inviteEmployees.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(inviteEmployees.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
  },
});

export const { updateParams, resetTable } = OrganizationEmployeeSlice.actions;
export const organizationEmployeeSlice = OrganizationEmployeeSlice;
