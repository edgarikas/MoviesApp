import { configureStore } from '@reduxjs/toolkit';
import contentReducer from '../Content/reducer';
import authReducer from '../auth/reducer';
import middleware from './middleware';

const store = configureStore({
  reducer: {
    content: contentReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middleware);
  },
});

export default store;
