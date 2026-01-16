import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from './store/filmsSlice';

export const store = configureStore({
  reducer: {
    films: filmsReducer,
  },
});
