import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './slices/ItemsSlices';
import { apiSlice } from './slices/apiSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
