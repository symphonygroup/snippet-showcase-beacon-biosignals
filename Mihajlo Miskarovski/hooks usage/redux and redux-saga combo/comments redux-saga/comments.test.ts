import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { AxiosError } from 'axios';
import { DeepPartial } from 'redux';
import api from '../../../api';
import comments from '../../reducers/comments';
import saga from './comments';
import { addInitial } from '../../reducers/banners';

const COMMENTS_RESPONSE = {
  content: [{ id: 6, note: 'first comment', changedAt: '2020-10-21T18:01:12.155827', changedBy: 'Stefan Dejanovski' }],
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
  totalElements: 1,
  first: true,
  sort: { sorted: true, unsorted: false, empty: false },
  number: 0,
  numberOfElements: 1,
  size: 10,
  empty: false,
};

describe('get comments', () => {
  test('should be able to fetch comments', () => {
    const payload = { id: '1', page: 0, size: 10 };

    return expectSaga(saga)
      .provide([[matchers.call.fn(api.tasks.getComments), { data: COMMENTS_RESPONSE }]])
      .put(comments.actions.getById.success({ id: payload.id, data: COMMENTS_RESPONSE }))
      .dispatch(comments.actions.getById.initial(payload))
      .silentRun();
  });

  test('should handle error for fetching comments', () => {
    const payload = { id: '2', page: 0, size: 10 };
    const error = new Error('Error fetching comments');

    return expectSaga(saga)
      .provide([[matchers.call.fn(api.tasks.getComments), throwError(error)]])
      .put(comments.actions.getById.error(payload.id))
      .dispatch(comments.actions.getById.initial(payload))
      .silentRun();
  });
});

describe('update comment', () => {
  test('should be able to fetch comments', () => {
    const payload = { id: 1, commentId: 1, data: 'new-data' };

    return expectSaga(saga)
      .provide([[matchers.call.fn(api.tasks.editComment), { data: COMMENTS_RESPONSE }]])
      .put(comments.actions.editComment.success({ id: payload.id, data: COMMENTS_RESPONSE }))
      .dispatch(comments.actions.editComment.initial(payload))
      .silentRun();
  });

  test('should handle error for fetching comments', () => {
    const payload = { id: 1, commentId: 1, data: 'new-data' };
    const error = new Error('Error fetching comments');

    return expectSaga(saga)
      .provide([[matchers.call.fn(api.tasks.editComment), throwError(error)]])
      .put(comments.actions.editComment.error(payload.id))
      .dispatch(comments.actions.editComment.initial(payload))
      .silentRun();
  });
});

describe('update comments', () => {
  test('should be able to fetch comments', () => {
    const payload = { id: '1', page: 0, size: 10 };

    return expectSaga(saga)
      .provide([[matchers.call.fn(api.tasks.getComments), { data: COMMENTS_RESPONSE }]])
      .put(comments.actions.updateById.success({ id: payload.id, data: COMMENTS_RESPONSE }))
      .dispatch(comments.actions.updateById.initial(payload))
      .silentRun();
  });

  test('should handle error for fetching comments', () => {
    const payload = { id: '2', page: 0, size: 10 };
    const error = new Error('Error fetching comments');

    return expectSaga(saga)
      .provide([[matchers.call.fn(api.tasks.getComments), throwError(error)]])
      .put(comments.actions.updateById.error(payload.id))
      .dispatch(comments.actions.updateById.initial(payload))
      .silentRun();
  });
});

describe('post comments', () => {
  test('should be able to post comments', () => {
    const payload = { id: '1', page: 0, size: 10 };

    const initialState = { [payload.id]: {} };
    const finalState = { [payload.id]: { updating: false, list: [...COMMENTS_RESPONSE.content] }, loading: false };

    return expectSaga(saga)
      .withReducer(comments.reducer)
      .withState(initialState)
      .provide([
        [matchers.call.fn(api.tasks.postComment), {}],
        [matchers.call.fn(api.tasks.getComments), { data: COMMENTS_RESPONSE }],
      ])
      .put(comments.actions.postComment.success())
      .put(addInitial({ type: 'success', message: 'Comment has been posted successfully' }))
      .dispatch(comments.actions.postComment.initial(payload))
      .hasFinalState(finalState)
      .silentRun();
  });

  test('should handle error for posting comments', () => {
    const payload = { id: '2', page: 0, size: 10 };
    const error: DeepPartial<AxiosError> = { name: '', response: { status: 500 } };
    const message = 'Error posting comment';

    return expectSaga(saga)
      .provide([[matchers.call.fn(api.tasks.postComment), throwError(error as Error)]])
      .put(comments.actions.postComment.error(payload.id))
      .put(addInitial({ type: 'error', message }))
      .dispatch(comments.actions.postComment.initial(payload))
      .silentRun();
  });

  test('should handle custom error for posting comments if error message has status 400', () => {
    const payload = { id: '2', page: 0, size: 10 };
    const error: DeepPartial<AxiosError> = {
      name: '',
      response: { status: 400, data: { errors: [{ message: 'Custom error message' }] } },
    };
    const message = 'Error posting comment';

    return expectSaga(saga)
      .provide([[matchers.call.fn(api.tasks.postComment), throwError(error as Error)]])
      .put(comments.actions.postComment.error(payload.id))
      .put(addInitial({ type: 'error', message: `${message} - ${error.response.data.errors[0].message}` }))
      .dispatch(comments.actions.postComment.initial(payload))
      .silentRun();
  });
});

describe('delete comments', () => {
  test('should be able to delete comments', () => {
    const payload = { id: 1, commentId: 1 };

    return expectSaga(saga)
      .provide([[matchers.call.fn(api.tasks.deleteComment), {}]])
      .put(comments.actions.deleteComment.success(payload))
      .put(addInitial({ type: 'success', message: 'Comment has been deleted successfully' }))
      .dispatch(comments.actions.deleteComment.initial(payload))
      .silentRun();
  });

  test('should be able to delete comments (error)', () => {
    const payload = { id: 1, commentId: 1 };

    return expectSaga(saga)
      .provide([[matchers.call.fn(api.tasks.deleteComment), throwError(new Error())]])
      .put(comments.actions.deleteComment.error())
      .put(addInitial({ type: 'error', message: 'Error deleting comment' }))
      .dispatch(comments.actions.deleteComment.initial(payload))
      .silentRun();
  });
});
