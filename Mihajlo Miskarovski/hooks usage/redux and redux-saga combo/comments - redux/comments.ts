import { get, has, isEmpty, unionBy } from 'lodash';
import { Comment } from '../../../api/types';
import createReducer, { asyncCase } from '../../../utils/createReducer';

export interface TaskCommentsState {
  list: Array<Comment>;
  hasMore: boolean;
  loading: boolean;
  updating: boolean;
  page: number;
}

export interface State {
  [x: number]: TaskCommentsState;
}

export const initialCommentsState: TaskCommentsState = {
  list: [],
  hasMore: true,
  page: 0,
  loading: false,
  updating: false,
};

const initialState: State = {};

const comments = createReducer({
  name: 'comments',
  initialState,
  cases: {
    getById: asyncCase({
      initial: (state: State, { payload }) => {
        if (isEmpty(state[payload.id])) {
          state[payload.id] = initialCommentsState;
        } else {
          state[payload.id].loading = true;
        }
      },
      success: (state: State, { payload: { id, data } }) => {
        state[id].list = state[id].list.concat(data.content);
        state[id].hasMore = !data.last;
        state[id].loading = false;
        state[id].page = data.pageable.pageNumber + 1;
      },
      error: (state: State, { payload }) => {
        state[payload].loading = false;
        state[payload].hasMore = false;
      },
    }),
    updateById: asyncCase({
      initial: (state: State, { payload: { id } }) => {
        if (has(state, id)) {
          state[id].updating = true;
        }
      },
      success: (state: State, { payload: { id, data } }) => {
        if (has(state, id) && get(state, `${id}.page`) !== 0) {
          state[id].list = unionBy(data.content, state[id].list, 'id');
          state[id].updating = false;
        }
      },
      error: (state: State, { payload }) => {
        if (has(state, payload)) {
          state[payload].updating = false;
          state[payload].hasMore = false;
        }
      },
    }),
    editComment: asyncCase({
      initial: (state: State, { payload: { id } }) => {
        if (has(state, id)) {
          state[id].updating = true;
        }
      },
      success: (state: State, { payload: { id, data } }) => {
        const index = state[id].list.findIndex((item) => item.id === data.id);
        state[id].list[index] = data;
        state[id].updating = false;
      },
      error: (state: State, { payload }) => {
        if (has(state, payload)) {
          state[payload].updating = false;
          state[payload].hasMore = false;
        }
      },
    }),
    postComment: asyncCase({
      initial: (state) => {
        state.loading = true;
      },
      success: (state) => {
        state.loading = false;
      },
      error: (state) => {
        state.loading = false;
      },
    }),
    deleteComment: asyncCase({
      initial: (state) => {
        state.loading = true;
      },
      success: (state, { payload: { id, commentId } }) => {
        const commentIndex = state[id].list.findIndex((item) => item.id === commentId);
        const newList = [...state[id].list.slice(0, commentIndex), ...state[id].list.slice(commentIndex + 1)];
        state[id].list = newList;
        state.loading = false;
      },
      error: (state) => {
        state.loading = false;
      },
    }),
    reset: (state: State, { payload }) => {
      state[payload] = initialCommentsState;
    },
  },
});

export default comments;
