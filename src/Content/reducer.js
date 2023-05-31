import { createReducer } from '@reduxjs/toolkit';
import * as CONTENT from './types';

import { FAVORITES_STORAGE_KEY } from '../constants';

const INITIAL_STATE = {
  favoritesMovies:
    JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY)) || [],
  movies: [],
  error: false,
  loading: false,
};

const createdReducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(CONTENT.ADD_FAVORITES, (state, action) => {
    state.favoritesMovies = state.favoritesMovies.concat(action.payload);
  });
  builder.addCase(CONTENT.REMOVE_FAVORITES, (state, action) => {
    state.favoritesMovies = state.favoritesMovies.filter(
      (id) => id !== action.payload
    );
  });
  builder.addCase(CONTENT.GET_MOVIES, (state, action) => {
    state.loading = true;
  });
  builder.addCase(CONTENT.GET_MOVIES_SUCCESS, (state, action) => {
    state.movies = action.payload;
    state.loading = false;
  });
  builder.addCase(CONTENT.GET_MOVIES_FAILURE, (state, action) => {
    state.error = true;
    state.loading = false;
  });
});

export default createdReducer;
