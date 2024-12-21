import { createSlice } from '@reduxjs/toolkit';
import { IComment } from '../../types';

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

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase()
  // }

});

export const commentsReducers = commentsSlice.reducer;

