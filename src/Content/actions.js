import * as CONTENT from './types';

export const toggleFavorite = (payload, isFavorite) => {
  return {
    type: isFavorite ? CONTENT.REMOVE_FAVORITES : CONTENT.ADD_FAVORITES,
    payload,
  };
};

export const setMoviesLoading = () => {
  return {
    type: CONTENT.GET_MOVIES,
  };
};

export const setMoviesSucces = (payload) => {
  return {
    type: CONTENT.GET_MOVIES_SUCCESS,
    payload,
  };
};
export const setMoviesFailure = () => {
  return {
    type: CONTENT.GET_MOVIES_FAILURE,
  };
};
