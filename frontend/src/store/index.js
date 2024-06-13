import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../service/api.js';
import { rootReducer } from './root-reducer.js';

const api = createAPI();

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});
