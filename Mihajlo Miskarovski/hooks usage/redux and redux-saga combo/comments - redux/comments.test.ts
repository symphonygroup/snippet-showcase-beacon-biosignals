import comments from '.';
import { State, initialCommentsState } from './comments';

const DUMMY_RESPONSE_GET_BY_ID = {
  content: [
    { id: 3, note: 'a', changedAt: '2020-10-05T14:59:23.925573', changedBy: 'Stefan Dejanovski' },
    { id: 2, note: 'd', changedAt: '2020-10-05T14:59:21.345871', changedBy: 'Stefan Dejanovski' },
    { id: 1, note: 'd', changedAt: '2020-10-05T14:59:15.90145', changedBy: 'Stefan Dejanovski' },
  ],
  pageable: {
    sort: { sorted: true, unsorted: false, empty: false },
    pageNumber: 0,
    pageSize: 10,
    offset: 0,
    paged: true,
    unpaged: false,
  },
  last: true,
  totalPages: 1,
  totalElements: 3,
  first: true,
  number: 0,
  sort: { sorted: true, unsorted: false, empty: false },
  numberOfElements: 3,
  size: 10,
  empty: false,
};

const DUMMY_RESPONSE_UPDATE_BY_ID = {
  content: [
    { id: 3, note: 'repeating', changedAt: '2020-10-05T14:59:23.925573', changedBy: 'Stefan Dejanovski' },
    { id: 4, note: 'new', changedAt: '2020-10-05T14:59:21.345871', changedBy: 'Stefan Dejanovski' },
    { id: 5, note: 'new', changedAt: '2020-10-05T14:59:15.90145', changedBy: 'Stefan Dejanovski' },
  ],
  pageable: {
    sort: { sorted: true, unsorted: false, empty: false },
    pageNumber: 0,
    pageSize: 10,
    offset: 0,
    paged: true,
    unpaged: false,
  },
  last: true,
  totalPages: 1,
  totalElements: 3,
  first: true,
  number: 0,
  sort: { sorted: true, unsorted: false, empty: false },
  numberOfElements: 3,
  size: 10,
  empty: false,
};

const DUMMY_COMMENT = {
  id: 3,
  note: 'a',
  changedAt: '2020-10-05T14:59:23.925573',
  changedBy: 'Stefan Dejanovski',
  updatedAt: '2020-11-05T14:59:23.925573',
};

const taskId = 1;
const commentListIndex = 0;

describe('comments', () => {
  const initialState: State = {
    [taskId]: { ...initialCommentsState, list: [DUMMY_COMMENT] },
  };

  test('should be able to get all comments by task id', () => {
    const initialAction = comments.actions.getById.initial({ id: taskId });
    const initial = comments.reducer(initialState, initialAction);

    const sucessAction = comments.actions.getById.success({ id: 1, data: DUMMY_RESPONSE_GET_BY_ID });
    const success = comments.reducer(initial, sucessAction);

    expect(success[taskId]).toBeDefined();
    expect(success[taskId].list).toHaveLength(
      DUMMY_RESPONSE_GET_BY_ID.content.length + initialState[taskId].list.length
    );
    expect(success[taskId].page).toBe(DUMMY_RESPONSE_GET_BY_ID.pageable.pageNumber + 1);
    expect(success[taskId].loading).toBe(false);
    expect(success[taskId].hasMore).toBe(!DUMMY_RESPONSE_GET_BY_ID.last);

    const error = comments.reducer(initial, comments.actions.getById.error(taskId));

    expect(error[taskId].loading).toBe(false);
    expect(error[taskId].hasMore).toBe(false);
  });

  test('should be able to get all comments by task id if state[payload.id] is empty', () => {
    const newInitialState: State = {};

    const initialAction = comments.actions.getById.initial({ id: taskId });
    const initial = comments.reducer(newInitialState, initialAction);

    expect(initial[taskId]).toBe(initialCommentsState);
  });

  test('should not update anything if task doesnt exist', () => {
    const initialUpdate = comments.actions.updateById.initial({ id: DUMMY_COMMENT.id });
    const state = comments.reducer(initialState, initialUpdate);

    expect(state[taskId].updating).toBe(false);
  });

  test('should be able to update comments (with union by ids) by task id if task exists', () => {
    // update values
    const initialUpdate = comments.actions.updateById.initial({ id: taskId });
    const initial = comments.reducer(initialState, initialUpdate);

    expect(initial[taskId].updating).toBe(true);

    const sucessUpdateAction = comments.actions.updateById.success({ id: taskId, data: DUMMY_RESPONSE_UPDATE_BY_ID });
    const success = comments.reducer(initialState, sucessUpdateAction);

    expect(success[taskId].updating).toBe(false);

    // 3 + 3 - 1 repeating = 5
    expect(success[taskId].list).toHaveLength(1);

    const error = comments.reducer(initial, comments.actions.updateById.error(taskId));

    expect(error[taskId].updating).toBe(false);
    expect(error[taskId].hasMore).toBe(false);
  });

  test('should not update anything if has not payload', () => {
    const ID = 1;
    const newInitialState: State = { [ID]: { ...initialCommentsState } };

    const initialAction = comments.actions.updateById.error();
    const initial = comments.reducer(newInitialState, initialAction);

    expect(initial[ID]).toBe(newInitialState[ID]);
  });

  test('should be able to post a comment', () => {
    const initialAction = comments.actions.postComment.initial();
    let state = comments.reducer(initialState, initialAction);

    expect(state.loading).toBe(true);

    const successAction = comments.actions.postComment.success({ payload: DUMMY_COMMENT, taskId });

    state = comments.reducer(state, successAction);
    expect(state.loading).toBe(false);
    expect(state[taskId].list[commentListIndex]).toBe(DUMMY_COMMENT);

    // error
    const errorAction = comments.actions.postComment.error();
    const error = comments.reducer(initialState, errorAction);

    expect(error.loading).toBe(false);
  });

  test('should be able to edit an existing comment if has payload', () => {
    const newInitialState: State = { [taskId]: { ...initialCommentsState } };

    const initialAction = comments.actions.editComment.initial({});
    const initial = comments.reducer(newInitialState, initialAction);

    expect(initial[taskId].updating).toBe(false);
  });

  test('should be able to edit an existing comment', () => {
    const changedComment = { ...DUMMY_COMMENT, note: 'changed note' };
    const initialAction = comments.actions.editComment.initial({ id: taskId });
    const firstState = comments.reducer(initialState, initialAction);

    expect(firstState[taskId].updating).toBe(true);
    expect(firstState[taskId].hasMore).toBe(true);

    const successAction = comments.actions.editComment.success({ id: taskId, data: changedComment });

    const state = comments.reducer(firstState, successAction);
    expect(state[taskId].loading).toBe(false);
    expect(state[taskId].list[0]).toBe(changedComment);
    expect(state[taskId].updating).toBe(false);

    // error
    const errorAction = comments.actions.editComment.error(taskId);
    const error = comments.reducer(state, errorAction);

    expect(error[taskId].updating).toBe(false);
    expect(error[taskId].hasMore).toBe(false);
  });

  test('should not edit anything if has not payload', () => {
    const newInitialState: State = { [taskId]: { ...initialCommentsState } };

    const initialAction = comments.actions.editComment.error();
    const initial = comments.reducer(newInitialState, initialAction);

    expect(initial[taskId]).toBe(newInitialState[taskId]);
  });

  test('should be able to delete comments', () => {
    const initialAction = comments.actions.deleteComment.initial();
    let state = comments.reducer(initialState, initialAction);

    expect(state.loading).toBe(true);

    const sucessAction = comments.actions.deleteComment.success({ id: taskId, commentId: DUMMY_COMMENT.id });
    state = comments.reducer(state, sucessAction);

    expect(state.loading).toBe(false);
    expect(state[taskId].list[commentListIndex]).toBeUndefined();

    // error
    const errorAction = comments.actions.deleteComment.error();
    const error = comments.reducer(initialState, errorAction);

    expect(error.loading).toBe(false);
  });

  test('should reset to initial state', () => {
    const initialAction = comments.actions.reset(taskId);
    const state = comments.reducer(initialState, initialAction);

    expect(state[taskId]).toStrictEqual(initialCommentsState);
  });
});
