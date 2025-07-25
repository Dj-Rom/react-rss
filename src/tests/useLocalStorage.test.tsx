import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './../hooks/useLocalStorage';

describe('useLocalStorage hook', () => {
  const key = 'testKey';

  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value if nothing is in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'default'));
    const [value] = result.current;

    expect(value).toBe('default');
  });

  it('returns stored value if it exists in localStorage', () => {
    localStorage.setItem(key, 'saved');
    const { result } = renderHook(() => useLocalStorage(key, 'default'));
    const [value] = result.current;

    expect(value).toBe('saved');
  });

  it('sets and updates the localStorage and state value', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'default'));

    act(() => {
      result.current[1]('new value');
    });

    const [updatedValue] = result.current;
    expect(updatedValue).toBe('new value');
    expect(localStorage.getItem(key)).toBe('new value');
  });
});
