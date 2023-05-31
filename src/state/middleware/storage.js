import * as CONTENT from '../../Content/types';
import * as AUTH from '../../auth/types';
import * as contentSelectors from '../../Content/selectors';
import * as authSelectors from '../../auth/selectors';
import { FAVORITES_STORAGE_KEY, AUTH_TOKEN_STORAGE_KEY } from '../../constants';

const storage =
  ({ getState }) =>
  (next) =>
  (action) => {
    next(action);

    const postActionState = getState();

    switch (action.type) {
      case CONTENT.ADD_FAVORITES:
      case CONTENT.REMOVE_FAVORITES:
        const favorites = contentSelectors.getFavoritesMovies(postActionState);

        window.localStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(favorites)
        );
        break;
      case AUTH.LOGIN_SUCCES:
        const token = authSelectors.getToken(postActionState);
        window.localStorage.setItem(
          AUTH_TOKEN_STORAGE_KEY,
          JSON.stringify(token)
        );
        break;
      case AUTH.LOGOUT:
        window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
        break;
      default:
        break;
    }
  };

export default storage;
