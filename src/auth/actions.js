import * as AUTH from './types';

export const loginLoading = (payload) => {
  return {
    type: AUTH.LOGIN,
    payload,
  };
};

export const loginSuccess = (payload) => {
  return {
    type: AUTH.LOGIN_SUCCES,
    payload,
  };
};

export const loginFailure = (payload) => {
  return {
    type: AUTH.LOGIN_FAILURE,
    payload,
  };
};
