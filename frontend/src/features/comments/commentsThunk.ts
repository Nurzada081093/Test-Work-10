import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { CommentWithoutId, IComment } from '../../types';

export const getComments = createAsyncThunk<IComment[], string>(
  'comments/getComments',
  async (id) => {
    const commentsResponse = await axiosRequest<IComment[]>(`/comments?news_id=${id}`);
    return commentsResponse.data || [];
  }
);

export const postComment = createAsyncThunk<void, CommentWithoutId>(
'comments/postComment',
  async (comment) => {
    await axiosRequest.post('/comments', {...comment});
  }
);

export const deleteComment = createAsyncThunk<void, string>(
  'comments/deleteComment',
  async (id: string) => {
    await axiosRequest.delete(`comments/${id}`);
  }
);