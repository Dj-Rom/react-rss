import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './slices/ItemsSlices';
import { apiSlice } from './slices/apiSlice';
import errorReducer from './slices/errorSlice';
export const store = configureStore({
  reducer: {
    items: itemsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
