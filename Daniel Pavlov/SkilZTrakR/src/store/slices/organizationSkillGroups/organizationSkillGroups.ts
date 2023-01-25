import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api';
import { URLParams } from '../../../types/params';

const name = 'organizationSkillGroups';

export const initialParams: URLParams = {
  page: 0,
  size: 20,
  sort: [],
  search: '',
};

export const initialState: any = {
  list: [],
  skillNames: [],
  hasMore: true,
  params: initialParams,
  loading: false,
  error: null,
};

export const getAllSkillNames = createAsyncThunk(`${name}/getAllSkillNames`, async () => {
  const response = await api.organization.allSkillNames();
  return response;
});

export const createSkillGroup = createAsyncThunk(
  `${name}/createSkillGroup`,
  async (
    group: {
      skillGroupName: string;
      skills: [{ value: string; label: string }];
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.organization.createSkillGroup(group);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const OrganizationSkillGroupsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSkillNames.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllSkillNames.fulfilled, (state, action) => {
        state.loading = false;
        state.skillNames = action.payload.data;
      })
      .addCase(getAllSkillNames.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createSkillGroup.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createSkillGroup.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createSkillGroup.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const organizationSkillGroupsSlice = OrganizationSkillGroupsSlice;
