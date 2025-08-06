import { store } from '../redux/store';
import { apiSlice } from '../redux/slices/apiSlice';
import itemsReducer from '../redux/slices/ItemsSlices';

describe('Redux store', () => {
  test('should have the correct reducers', () => {
    const state = store.getState();
    expect(state).toHaveProperty('items');
    expect(state).toHaveProperty(apiSlice.reducerPath);
  });

  test('items reducer should be the correct one', () => {
    const state = store.getState();
    expect(state.items).toEqual(itemsReducer(undefined, { type: '@@INIT' }));
  });

  test('should include apiSlice middleware', () => {
    expect(typeof store.dispatch).toBe('function');
  });
});
