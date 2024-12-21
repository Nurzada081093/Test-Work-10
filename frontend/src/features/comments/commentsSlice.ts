import { createSlice } from '@reduxjs/toolkit';
import { IComment } from '../../types';
import { getComments } from './commentsThunk.ts';
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
      });
  }
});

export const commentsReducers = commentsSlice.reducer;

