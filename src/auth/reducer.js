import * as AUTH from './types';
import { AUTH_TOKEN_STORAGE_KEY } from '../constants';

const INITIAL_STATE = {
  token:
    JSON.parse(window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)) || null,
  loading: false,
  error: null,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH.LOGIN:
      return { ...state, loading: action.payload };
    case AUTH.LOGIN_SUCCES:
      return { ...state, loading: false, token: action.payload };

    case AUTH.LOGIN_FAILURE:
      const errorMessage =
        {
          empty: 'Fields cannot be Empty',
          credentials: 'Check login details',
          request: 'Oops! Something expolded! 💥',
        }[action.payload] || null;
      return { ...state, loading: false, error: errorMessage };

    case AUTH.LOGOUT:
      return { ...state, token: null };
    default:
      return state;
  }
}

export default reducer;
