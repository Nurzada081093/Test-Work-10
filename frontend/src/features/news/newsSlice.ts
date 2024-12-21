import { createSlice } from '@reduxjs/toolkit';
import { INews } from '../../types';
import { deleteNews, getNews, getOneNews, postNews } from './newsThunk.ts';
import { RootState } from '../../app/store.ts';

interface NewsState {
  news: INews[];
  oneNews: INews | null;
  loadings: {
    getNews: boolean;
    addNews: boolean;
    deleteNews: boolean;
    getOneNews: boolean;
  },
  error: boolean;
}

const initialState: NewsState = {
  news: [],
  oneNews: null,
  loadings: {
    getNews: false,
    addNews: false,
    deleteNews: false,
    getOneNews: false
  },
  error: false,
}

export const allNewsSlice = (state: RootState) => state.news.news;
export const getOneNewsSlice = (state: RootState) => state.news.oneNews;
export const selectCreateLoading = (state: RootState) => state.news.loadings.addNews;
export const getNewsLoading = (state: RootState) => state.news.loadings.getNews;

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.loadings.getNews = true;
        state.error = false;
      })
      .addCase(getNews.fulfilled, (state, {payload: news}) => {
        state.loadings.getNews = false;
        state.error = false;
        state.news = news;
      })
      .addCase(getNews.rejected, (state) => {
        state.loadings.getNews = false;
        state.error = true;
      })
      .addCase(postNews.pending, (state) => {
        state.loadings.addNews = true;
        state.error = false;
      })
      .addCase(postNews.fulfilled, (state) => {
        state.loadings.addNews = false;
        state.error = false;
      })
      .addCase(postNews.rejected, (state) => {
        state.loadings.addNews = false;
        state.error = true;
      })
      .addCase(deleteNews.pending, (state) => {
        state.loadings.deleteNews = true;
        state.error = false;
      })
      .addCase(deleteNews.fulfilled, (state) => {
        state.loadings.deleteNews = false;
        state.error = false;
      })
      .addCase(deleteNews.rejected, (state) => {
        state.loadings.deleteNews = false;
        state.error = true;
      })
      .addCase(getOneNews.pending, (state) => {
        state.loadings.getOneNews = true;
        state.error = false;
      })
      .addCase(getOneNews.fulfilled, (state, {payload: news}) => {
        state.oneNews = null;
        state.loadings.getOneNews = false;
        state.error = false;
        state.oneNews = news;
      })
      .addCase(getOneNews.rejected, (state) => {
        state.loadings.getOneNews = false;
        state.error = true;
      });
  }
});

export const newsReducers = newsSlice.reducer;

