export const FAVORITES_STORAGE_KEY = 'MOVIES_FAVORITES';
export const AUTH_TOKEN_STORAGE_KEY = 'AUTH_TOKEN_STORAGE_KEY';

const API_DOM = 'https://dummy-video-api.onrender.com';

export const API = {
  login: `${API_DOM}/auth/login`,
  freeContent: `${API_DOM}/content/free-items`,
  paidContent: `${API_DOM}/content/items`,
  singleMovie: (id) => `${API_DOM}/content/items/${id}`,
};
