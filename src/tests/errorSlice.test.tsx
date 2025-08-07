import { describe, it, expect } from 'vitest';
import errorReducer, { setError, clearError } from '../redux/slices/errorSlice';

describe('errorSlice reducer', () => {
  const initialState = {
    message: '',
    isError: false,
  };

  it('should return the initial state', () => {
    const result = errorReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle setError action', () => {
    const result = errorReducer(
      initialState,
      setError({
        message: 'Something went wrong',
        isError: true,
      })
    );

    expect(result).toEqual({
      message: 'Something went wrong',
      isError: true,
    });
  });

  it('should handle clearError action', () => {
    const previousState = {
      message: 'Error occurred',
      isError: true,
    };

    const result = errorReducer(previousState, clearError());

    expect(result).toEqual({
      message: '',
      isError: false,
    });
  });
});
