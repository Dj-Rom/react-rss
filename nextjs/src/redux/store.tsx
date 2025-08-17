import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '@/redux/slices/ItemsSlices';
import { apiSlice } from '@/redux/slices/apiSlice';
import errorReducer from '@/redux/slices/errorSlice';
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
