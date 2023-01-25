import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api';
import { URLParams } from '../../../types/params';

const name = 'organizationSkills';

export const initialParams: URLParams = {
  page: 0,
  size: 20,
  sort: [],
  search: '',
};

export const initialState: any = {
  list: [],
  hasMore: true,
  params: initialParams,
  loading: false,
  error: null,
};

export const createSkill = createAsyncThunk(
  `${name}/createSkill`,
  async (skill: { skillName: string, infoLink: string }, { rejectWithValue }) => {
    try {
      const response = await api.organization.createSkill(skill);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const OrganizationSkillsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSkill.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.loading = false;
      })
  },
});

export const organizationSkillsSlice = OrganizationSkillsSlice;
