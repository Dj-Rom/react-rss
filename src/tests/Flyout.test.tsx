import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';

import Flyout from '../components/Flyout';
import itemsReducer, { clearItems } from '../redux/slices/ItemsSlices';

function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      items: itemsReducer,
    },
    preloadedState,
  });
}

describe('Flyout component', () => {
  const sampleItems = [
    { id: '1', name: 'Item 1', detailsUrl: 'url1' },
    { id: '2', name: 'Item 2', detailsUrl: 'url2' },
  ];

  beforeEach(() => {
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = vi.fn();
  });

  it('does not render if no selected items', () => {
    const store = createTestStore({ items: { selectedItems: [] } });

    const { container } = render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders with selected items and displays count', () => {
    const store = createTestStore({ items: { selectedItems: sampleItems } });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByTestId('flyout')).toBeInTheDocument();
    expect(screen.getByText('2 items selected')).toBeInTheDocument();
  });

  it('dispatches clearItems when Unselect all button is clicked', () => {
    const store = createTestStore({ items: { selectedItems: sampleItems } });
    const spyDispatch = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Unselect all'));

    expect(spyDispatch).toHaveBeenCalledWith(clearItems());
  });

  it('triggers CSV download when Download button clicked', () => {
    const store = createTestStore({ items: { selectedItems: sampleItems } });

    const clickMock = vi.fn();
    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation(
      (tagName: string) => {
        const element = originalCreateElement(tagName);
        if (tagName === 'a') {
          element.click = clickMock;
        }
        return element;
      }
    );

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Download'));

    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();

    vi.restoreAllMocks();
  });
});
