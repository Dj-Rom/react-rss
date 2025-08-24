import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormData } from '../types';

interface FormState {
  data: (FormData & { id: number })[];
}

const initialState: FormState = {
  data: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData & { id: number }>) => {
      state.data.push(action.payload);
    },
  },
});

export const { addFormData } = formSlice.actions;
export default formSlice.reducer;
