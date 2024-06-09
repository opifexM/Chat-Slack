import {configureStore} from "@reduxjs/toolkit";
import {createAPI} from "../service/api.js";
import {rootReducer} from "./root-reducer.js";

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
