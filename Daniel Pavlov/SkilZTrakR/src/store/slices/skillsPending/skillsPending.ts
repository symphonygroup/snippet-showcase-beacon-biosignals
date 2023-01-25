import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import api from '../../../api';
import { SkillsSliceState } from '../../../api/types';
import { URLParams } from '../../../types/params';
import URLParamsConvertor from '../../../utils/URLParamsConvertor';

const name = 'skillsPending';

export const initialParams: URLParams = {
  page: 0,
  size: 20,
  sort: [],
  search: '',
  email: '',
};

export const initialState: SkillsSliceState = {
  list: [],
  hasMore: true,
  params: initialParams,
  loading: false,
  error: null,
};

export const getAll = createAsyncThunk(`${name}/getAll`, async (params: URLParams) => {
  const response = await api.skills.pending(URLParamsConvertor(params));
  return response;
});

const SkillsPendingSlice = createSlice({
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
  extraReducers: builder => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAll.fulfilled, (state, action: any) => {
        state.list = [...state.list, ...action.payload.data.content];
        state.hasMore = !action.payload.data.last;
        state.loading = false;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.hasMore = false;
      })
  }
});

export const { updateParams, resetTable } = SkillsPendingSlice.actions;
export const skillsPendingSlice = SkillsPendingSlice;
