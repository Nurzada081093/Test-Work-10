import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { INews, NewsMutation } from '../../types';

export const getNews = createAsyncThunk<INews[], void>(
  'news/getNews',
  async () => {
    const newsResponse = await axiosRequest<INews[]>('/news');
    return newsResponse.data || [];
  }
);

export const getOneNews = createAsyncThunk<INews, string>(
  'news/getOneNews',
  async (id) => {
    const oneNewsResponse = await axiosRequest<INews>(`/news/${id}`);
    return oneNewsResponse.data || null;
  }
);

export const postNews = createAsyncThunk<void, NewsMutation>(
  'news/postNews',
  async (oneNews) => {
    const formData = new FormData();

    const keys = Object.keys(oneNews) as (keyof NewsMutation)[];

    keys.forEach((key) => {
      const value = oneNews[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosRequest.post('/news', formData);
  }
);

export const deleteNews = createAsyncThunk<void, string>(
  'news/deleteNews',
  async (id: string) => {
    await axiosRequest.delete(`news/${id}`);
  }
);