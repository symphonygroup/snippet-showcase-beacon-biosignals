import { call, takeLatest, put, takeEvery } from 'redux-saga/effects';
import comments from '../../reducers/comments';
import { addInitial } from '../../reducers/banners';
import api from '../../../api';

function* getComments({ payload: { id, page, size } }) {
  try {
    const response = yield call(api.tasks.getComments, { id, page, size });

    yield put(comments.actions.getById.success({ id, data: response.data }));
  } catch (e) {
    yield put(comments.actions.getById.error(id));
  }
}

function* updateComments({ payload: { id, size = 1 } }) {
  try {
    const response = yield call(api.tasks.getComments, { id, page: 0, size });
    yield put(comments.actions.updateById.success({ id, data: response.data }));
  } catch (e) {
    yield put(comments.actions.updateById.error(id));
  }
}

function* updateComment({ payload: { data, id, commentId } }) {
  try {
    const response = yield call(api.tasks.editComment, { data, id, commentId });
    yield put(comments.actions.editComment.success({ id, data: response.data }));
    yield put(addInitial({ type: 'success', message: 'Comment has been edited successfully' }));
  } catch (e) {
    yield put(comments.actions.editComment.error(id));
  }
}

function* postComments({ payload: { data, id } }) {
  try {
    yield call(api.tasks.postComment, { data, id });
    yield put(comments.actions.postComment.success());
    yield put(addInitial({ type: 'success', message: 'Comment has been posted successfully' }));
    yield put(comments.actions.updateById.initial({ id }));
  } catch (e) {
    yield put(comments.actions.postComment.error(id));
    let message = `Error posting comment`;
    const errorResponse = e.response;
    if (errorResponse.status === 400) {
      message = `${message} - ${errorResponse.data.errors[0].message}`;
    }
    yield put(addInitial({ type: 'error', message }));
  }
}

function* deleteComments({ payload }) {
  try {
    const { id, commentId } = payload;
    yield call(api.tasks.deleteComment, { id, commentId });
    yield put(comments.actions.deleteComment.success({ id, commentId }));
    yield put(addInitial({ type: 'success', message: 'Comment has been deleted successfully' }));
  } catch (e) {
    yield put(comments.actions.deleteComment.error());
    const message = `Error deleting comment`;
    yield put(addInitial({ type: 'error', message }));
  }
}

export default function* watcher() {
  yield takeLatest(comments.actionTypes.getById.initial, getComments);
  yield takeEvery(comments.actionTypes.updateById.initial, updateComments);
  yield takeLatest(comments.actionTypes.editComment.initial, updateComment);
  yield takeLatest(comments.actionTypes.postComment.initial, postComments);
  yield takeLatest(comments.actionTypes.deleteComment.initial, deleteComments);
}
