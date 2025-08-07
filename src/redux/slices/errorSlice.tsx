import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ErrorTypeSlice = {
  message: string;
  isError: boolean;
};

const initialState: ErrorTypeSlice = {
  message: '',
  isError: false,
};

const errorSlice = createSlice({
  name: 'errorSlice',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorTypeSlice>) => {
      state.isError = action.payload.isError;
      state.message = action.payload.message;
    },
    clearError: (state) => {
      state.isError = false;
      state.message = '';
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
