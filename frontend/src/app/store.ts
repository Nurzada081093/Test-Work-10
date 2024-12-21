import { configureStore } from '@reduxjs/toolkit';
import {newsReducers} from "../features/news/newsSlice.ts";
import {commentsReducers} from "../features/comments/commentsSlice.ts";

export const store = configureStore({
  reducer: {
    news: newsReducers,
    comments: commentsReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;