import { createSlice } from '@reduxjs/toolkit';
import { IComment } from '../../types';
import { deleteComment, getComments, postComment } from './commentsThunk.ts';
import { RootState } from '../../app/store.ts';

interface NewsState {
  comments: IComment[];
  loadings: {
    getComments: boolean;
    addComment: boolean;
    deleteComment: boolean;
  },
  error: boolean;
}

const initialState: NewsState = {
  comments: [],
  loadings: {
    getComments: false,
    addComment: false,
    deleteComment: false
  },
  error: false,
}

export const allCommentsSlice = (state: RootState) => state.comments.comments;
export const getCommentsSlice = (state: RootState) => state.comments.loadings.getComments;
export const addCommentSlice = (state: RootState) => state.comments.loadings.addComment;
export const deleteCommentSlice = (state: RootState) => state.comments.loadings.deleteComment;

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loadings.getComments = true;
        state.error = false;
      })
      .addCase(getComments.fulfilled, (state, {payload: comments}) => {
        state.loadings.getComments = false;
        state.error = false;
        state.comments = comments;
      })
      .addCase(getComments.rejected, (state) => {
        state.loadings.getComments = false;
        state.error = true;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loadings.deleteComment = true;
        state.error = false;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.loadings.deleteComment = false;
        state.error = false;
      })
      .addCase(deleteComment.rejected, (state) => {
        state.loadings.deleteComment = false;
        state.error = true;
      })
      .addCase(postComment.pending, (state) => {
        state.loadings.addComment = true;
        state.error = false;
      })
      .addCase(postComment.fulfilled, (state) => {
        state.loadings.addComment = false;
        state.error = false;
      })
      .addCase(postComment.rejected, (state) => {
        state.loadings.addComment = false;
        state.error = true;
      });
  }
});

export const commentsReducers = commentsSlice.reducer;

