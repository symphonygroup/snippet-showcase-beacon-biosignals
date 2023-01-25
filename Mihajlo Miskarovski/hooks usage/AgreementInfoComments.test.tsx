import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { customReduxWrapper, wrap, wrappers } from '../../../../utils-tests';
import AgreementInfoComments from './AgreementInfoComments';
import agreementComments from '../../../../store/reducers/agreementComments';

jest.mock('../../../../store/reducers/agreementComments', () => ({
  actions: {
    getById: {
      initial: jest.fn().mockImplementation((id: number) => ({ type: '', id })),
    },
    postComment: {
      initial: jest.fn().mockImplementation(({ id, data }) => ({ type: '', id, data })),
    },
    deleteComment: {
      initial: jest.fn().mockImplementation(({ id, data }) => ({ type: '', id, data })),
    },
    editComment: {
      initial: jest.fn().mockImplementation(({ id, data }) => ({ type: '', id, data })),
    },
  },
}));

const history = createBrowserHistory();

const AGREEMENT_ID = String(Math.random());
const page = 1;
const size = 10;

const comment = {
  note: 'some note here',
  id: 1,
  changedAt: '2021-05-19T12:55:53.677043',
  updatedAt: null,
  changedBy: 'Daniel Pavlov',
  source: 'Manual',
};

const REDUX_STATE = {
  maps: {
    userRoles: {
      list: [],
      permissions: [],
      permissionTypes: [],
    },
  },
  user: { isActive: true, id: 1, fullName: 'Daniel Pavlov', permissions: [] },
  agreement: {
    details: {
      [AGREEMENT_ID]: {
        ...comment,
        source: 'MRI',
      },
    },
    loading: false,
  },
  agreementComments: {
    [AGREEMENT_ID]: {
      list: [comment],
      hasMore: true,
      page,
      loading: false,
      updating: false,
    },
  },
};

function setup() {
  history.push(`/agreements/${AGREEMENT_ID}`);

  const wrappedComponent = customReduxWrapper(
    <Router history={history}>
      <Route path="/agreements/:id">
        <AgreementInfoComments />
      </Route>
    </Router>,
    REDUX_STATE
  );

  render(wrap(wrappedComponent.component).with(wrappers.theme));
}
describe('AgreementInfoComments', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  test('should fetch a list of comments on load', () => {
    setup();
    expect(agreementComments.actions.getById.initial).toBeCalledTimes(1);
    expect(agreementComments.actions.getById.initial).toBeCalledWith({ id: AGREEMENT_ID, page, size });
  });

  test('shoud post a new comment and then refresh comments list', () => {
    setup();
    const note = 'lorem ipsum';

    const postButton = screen.getByTestId('post-comment-button');
    const textArea = screen.getByTestId('comment-text-area');

    fireEvent.click(postButton);

    fireEvent.change(textArea, { target: { value: note } });

    expect(textArea.innerHTML).toBe(note);

    fireEvent.click(postButton);

    expect(agreementComments.actions.postComment.initial).toBeCalledTimes(1);
    expect(agreementComments.actions.postComment.initial).toBeCalledWith({ data: { note }, id: AGREEMENT_ID });

    expect(agreementComments.actions.getById.initial).toBeCalledTimes(1);
    expect(agreementComments.actions.getById.initial).toBeCalledWith({ id: AGREEMENT_ID, page, size });
  });

  test('shoud delete a comment if user owns the comment and clicks delete on the dialog window or cancel if clicked cancel', () => {
    setup();

    const deleteButtons = screen.queryAllByTestId('agreement-comment-delete-icon');
    const deleteButton = deleteButtons[0];

    // userEvent.click(deleteButton);

    const cancelButtons = screen.queryAllByTestId('agreement-comment-cancel-button');
    const cancelButton = cancelButtons[0];
    if (cancelButton) {
      userEvent.click(cancelButton);
    }

    // click the delete icon again

    userEvent.click(deleteButton);

    userEvent.click(screen.getByText('Delete'));
  });

  test('shoud be able to edit existing comment if comment is owned by the current user', () => {
    setup();

    const editButtons = screen.queryAllByTestId('agreement-comment-edit-icon');
    const editButton = editButtons[0];

    userEvent.click(editButton);

    fireEvent.change(screen.getByTestId('comment-edit-text-area'), { target: { value: '' } });

    userEvent.click(screen.getByTestId('save-editing-comment'));

    fireEvent.change(screen.getByTestId('comment-edit-text-area'), { target: { value: 'test note' } });

    userEvent.click(screen.getByTestId('save-editing-comment'));
  });

  test('should cancel editing comment', () => {
    setup();

    const editButtons = screen.queryAllByTestId('agreement-comment-edit-icon');
    const editButton = editButtons[0];

    userEvent.click(editButton);

    userEvent.click(screen.getByText('Cancel'));
  });

  // test('should indicate that a comment has been edited', () => {
  //   history.push(`/agreements/${AGREEMENT_ID}`);

  //   const wrappedComponent = customReduxWrapper(
  //     <Router history={history}>
  //       <Route path="/agreements/:id">
  //         <AgreementInfoComments />
  //       </Route>
  //     </Router>,
  //     {
  //       ...REDUX_STATE,
  //       comments: {
  //         [AGREEMENT_ID]: {
  //           list: [{ ...comment, updatedAt: '2021-02-12T12:55:53.677043' }],
  //           hasMore: true,
  //           page,
  //           loading: false,
  //           updating: false,
  //         },
  //       },
  //     }
  //   );

  //   render(wrap(wrappedComponent.component).with(wrappers.theme));
  //   const editedText = screen.getByTestId('comment-note').innerHTML;
  //   expect(editedText).toContain('(Edited)');
  // });

  test('should display borders inbetween if there are more than one comments', () => {
    history.push(`/agreements/${AGREEMENT_ID}`);

    const wrappedComponent = customReduxWrapper(
      <Router history={history}>
        <Route path="/agreements/:id">
          <AgreementInfoComments />
        </Route>
      </Router>,
      {
        ...REDUX_STATE,
        agreementComments: {
          [AGREEMENT_ID]: {
            list: [
              { ...comment, id: 1 },
              { ...comment, id: 2 },
            ],
            hasMore: true,
            page,
            loading: false,
            updating: false,
          },
        },
      }
    );

    render(wrap(wrappedComponent.component).with(wrappers.theme));
  });

  test(`should divide comments by "|" if agreement is imported and source is not manual`, () => {
    history.push(`/agreements/${AGREEMENT_ID}`);
    const commentNote =
      'MRI Third Party Entity Top is CAROL VINCENT & ASSOCIATES, LLC|MRI Account ID 282440|Signatory Company is PORCH PICKIN’ PUBLISHING|MRI Company ID 22532';
    const commentNoteLength = commentNote.split('|').length;
    const wrappedComponent = customReduxWrapper(
      <Router history={history}>
        <Route path="/agreements/:id">
          <AgreementInfoComments />
        </Route>
      </Router>,
      {
        ...REDUX_STATE,
        agreementComments: {
          [AGREEMENT_ID]: {
            list: [
              {
                ...comment,
                source: 'MRI',
                note: commentNote,
                id: AGREEMENT_ID,
              },
            ],
            hasMore: true,
            page,
            loading: false,
            updating: false,
          },
        },
      }
    );

    render(wrap(wrappedComponent.component).with(wrappers.theme));

    const commentImportedEntities = screen.queryAllByTestId('imported-agreement-entity');

    expect(commentImportedEntities.length).toBe(commentNoteLength);
  });
});
