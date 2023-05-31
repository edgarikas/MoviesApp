import { createSelector } from '@reduxjs/toolkit';

const getContentState = (state) => state.content;

export const getFavoritesMovies = createSelector(
  getContentState,
  (content) => content.favoritesMovies || []
);
export const getMovies = createSelector(
  getContentState,
  (content) => content.movies
);

export const getLoading = createSelector(
  getContentState,
  (content) => content.loading
);

export const getError = createSelector(
  getContentState,
  (content) => content.error
);

export const getMovieById = createSelector(getMovies, (movies) => (movieId) => {
  const singleMovie = movies.find(({ id }) => id === movieId);

  return singleMovie;
});
