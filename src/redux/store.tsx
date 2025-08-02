import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './slices/ItemsSlices';

export const store = configureStore({
  reducer: {
    itemsReducer: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
