import { createSlice } from '@reduxjs/toolkit';
import { INews } from '../../types';

interface NewsState {
  news: INews[];
  loadings: {
    getNews: boolean;
    addNews: boolean;
    deleteNews: boolean;
  },
  error: boolean;
}

const initialState: NewsState = {
  news: [],
  loadings: {
    getNews: false,
    addNews: false,
    deleteNews: false
  },
  error: false,
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase()
  // }

});

export const newsReducers = newsSlice.reducer;

