import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Item {
  id: string;
  name: string;
  description: string;
  detailsUrl: string;
}

interface ItemsState {
  selectedItems: Item[];
}

const initialState: ItemsState = {
  selectedItems: [],
};

const itemsSlice = createSlice({
  name: 'itemsSlice',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      const exists = state.selectedItems.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.selectedItems.push(action.payload);
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload
      );
    },

    clearItems(state) {
      state.selectedItems = [];
    },
  },
});

export const { addItem, removeItem, clearItems } = itemsSlice.actions;

export default itemsSlice.reducer;
