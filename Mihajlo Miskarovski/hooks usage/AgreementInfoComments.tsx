import React, { useCallback, useState, useRef } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Text, Button } from '@tidbits/react-tidbits';
import { ComposeIcon } from '@tidbits/react-tidbits/Icons';
import { Label } from '@tidbits/react-tidbits/Form';
import { TextArea } from '@tidbits/react-tidbits/Input';
import { format } from 'date-fns-tz';
import Icon from '../../../../components/Icon';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import agreementCommentsReducer, { initialCommentsState } from '../../../../store/reducers/agreementComments';
import { Comment, UserData } from '../../../../api/types';
import { NextCall } from '../../../../hooks/useInfiniteScroll/useInfiniteScroll';
import If from '../../../../components';
import actions from '../../../../components/ConfirmationModal/actions';
import ConfirmationModal from '../../../../components/ConfirmationModal';

const COMMENTS_LIST_PADDING = 20;

function AgreementInfoComments() {
  const dispatch = useDispatch();
  const SOURCE_MRI = 'MRI';
  const dateFormat = `MMM dd yyyy 'at' hh:mm aa`;
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const locale = 'en-US';
  const maxCharacters = 600;
  const { id } = useParams<{ id: string }>();
  const [newComment, setNewComment] = useState<string>('');
  const [editingComment, setEditingComment] = useState<string>('');
  const [editCommentIndex, setEditCommentIndex] = useState<number | null>(null);
  const [deleteCommentIndex, setDeleteCommentIndex] = useState<number | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const currentUser = useSelector<RootStateOrAny, UserData>((state) => state.user);
  const source = useSelector<RootStateOrAny>((state) => state.agreement.details[id].source);
  const containerRef = useRef<HTMLHtmlElement>();

  const comments = useSelector<RootStateOrAny, typeof initialCommentsState>(
    (state) => state.agreementComments[id] || initialCommentsState
  );

  const next = useCallback(
    ({ page, size }: NextCall) => {
      dispatch(agreementCommentsReducer.actions.getById.initial({ id, page, size }));
    },
    [dispatch, id]
  );

  const isActive = useSelector<any, boolean>((state) => state.user.isActive);

  const isOwnComment = (index: number) => {
    return currentUser?.fullName === comments?.list[index].changedBy;
  };

  const { Trigger } = useInfiniteScroll({
    page: comments.page,
    rows: comments.list,
    loading: comments.loading,
    hasMore: comments.hasMore,
    size: 10,
    next,
    container: containerRef.current,
  });

  const containerHeight = useCallback(() => {
    return containerRef?.current?.getBoundingClientRect().top + COMMENTS_LIST_PADDING || 0;
  }, []);

  const addComment = () => {
    const comment = newComment.trim();
    if (comment.length === 0) {
      return;
    }
    dispatch(agreementCommentsReducer.actions.postComment.initial({ data: { note: comment }, id }));
    setNewComment('');
  };

  const removeComment = () => {
    const comment = comments.list[deleteCommentIndex];
    dispatch(agreementCommentsReducer.actions.deleteComment.initial({ id, commentId: comment.id }));
    setDeleteCommentIndex(null);
  };

  const editComment = (index: number) => {
    setEditCommentIndex(index);
  };

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleEdit = (e) => {
    setEditingComment(e.target.value);
  };

  const handleDelete = (index: number) => {
    setShowConfirmationModal(true);
    setDeleteCommentIndex(index);
  };

  const cancelDelete = () => {
    setShowConfirmationModal(false);
    setDeleteCommentIndex(null);
  };

  const saveEditingComment = () => {
    const comment = editingComment.trim();
    if (comment.length === 0) {
      return;
    }
    const commentId = comments?.list[editCommentIndex].id;
    dispatch(
      agreementCommentsReducer.actions.editComment.initial({
        data: { note: comment },
        id,
        commentId,
      })
    );
    setEditCommentIndex(null);
    setEditingComment('');
  };

  return (
    <>
      <ConfirmationModal
        isActive={showConfirmationModal}
        actionType={actions.deleteComment}
        onConfirm={removeComment}
        hide={cancelDelete}
      />
      <Box flex="1" overflow="auto" width="100%" p="spacer10" display="flex" flexDirection="column">
        <If condition={isActive}>
          <Box data-testid="comments-container" mt="spacer10">
            <Label display="flex" flexDirection="column" borderColor="lightBorder" m="0px" borderBottom="1px solid">
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Text textStyle="bodyMedium">Add Comment</Text>
                <Text color="clrGray" textStyle="bodySmallRegular">
                  {maxCharacters - newComment.length} characters left
                </Text>
              </Box>
              <TextArea
                data-testid="comment-text-area"
                minHeight="70px"
                maxLength={maxCharacters}
                onChange={handleChange}
                height="60px"
                value={newComment}
              />
              <Button
                data-testid="post-comment-button"
                onClick={addComment}
                mt="spacer10"
                mb="15px"
                alignSelf="flex-end"
                type="button"
                variant="standard"
              >
                Post
              </Button>
            </Label>
          </Box>
        </If>
        <Box
          id="agreement-comments-scroll-container"
          overflow="auto"
          height={`calc(100vh - ${containerHeight()}px)`}
          display="flex"
          flexDirection="column"
          p={isActive && 'spacer10'}
          ref={containerRef}
        >
          {comments.list.map((comment: Comment, index) => (
            <Box
              m="5px 0"
              key={comment.id}
              borderBottom={index === comments.list.length - 1 ? 'none' : '1px solid'}
              borderColor="lightBorder"
              p="10px 0"
            >
              <If condition={editCommentIndex !== index}>
                <Text data-testid="comment-note" mb="5px" color="clrGray" textStyle="bodySmallRegular">
                  {`${comment.changedBy} on ${format(
                    new Date(`${new Date(comment.changedAt).toLocaleString(locale, { timeZone })} UTC`),
                    dateFormat
                  )}:`}
                  {comment.updatedAt && comment.updatedAt !== comment.changedAt ? ' (Edited)' : ''}
                </Text>
                {comment.note.includes('|') && source === SOURCE_MRI ? (
                  comment.note.split('|').map((item) => {
                    return (
                      <Text key={item} data-testid="imported-agreement-entity" spaceBelow="spacer10">
                        {item}
                      </Text>
                    );
                  })
                ) : (
                  <Text spaceBelow="spacer10">{comment.note}</Text>
                )}
                <If condition={Boolean(isOwnComment(index)) && isActive}>
                  <Box display="flex" justifyContent="flex-end" alignItems="center" mr="5px">
                    <ComposeIcon
                      cursor="pointer"
                      color="labelPlaceholder"
                      onClick={() => editComment(index)}
                      width="14px"
                      mr="5px"
                      data-testid="agreement-comment-edit-icon"
                    />
                    <Icon
                      name="delete"
                      size={16}
                      color="labelPlaceholder"
                      onClick={() => handleDelete(index)}
                      cursor="pointer"
                      data-testid="agreement-comment-delete-icon"
                    />
                  </Box>
                </If>
              </If>
              <If condition={editCommentIndex === index}>
                <Box>
                  <Text mb="5px" color="clrGray" textStyle="bodySmallRegular">
                    {`${comment.changedBy} on ${format(
                      new Date(`${new Date(comment.changedAt).toLocaleString(locale, { timeZone })} UTC`),
                      dateFormat
                    )}:`}
                  </Text>
                  <TextArea
                    data-testid="comment-edit-text-area"
                    maxLength={maxCharacters}
                    onChange={handleEdit}
                    height="60px"
                    defaultValue={comment.note}
                  />
                  <Box display="flex" justifyContent="flex-end" mt="10px">
                    <Button
                      data-testid="agreement-comment-cancel-button"
                      color="clrGray"
                      hoverColor="labelCaption"
                      borderWidth="0"
                      outline="none"
                      onClick={() => editComment(null)}
                    >
                      Cancel
                    </Button>
                    <Button data-testid="save-editing-comment" outline="none" onClick={saveEditingComment}>
                      Save
                    </Button>
                  </Box>
                </Box>
              </If>
            </Box>
          ))}
          <Trigger />
        </Box>
      </Box>
    </>
  );
}

export default AgreementInfoComments;
