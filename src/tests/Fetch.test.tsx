import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

beforeEach(() => {
  vi.resetAllMocks();
});

describe('App fetchItems method', () => {
  it('sets hasError state and displays error UI on API failure', async () => {
    // Mock a failed API response (not ok)
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);

    render(<App />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'pikachu{enter}');

    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /something went wrong/i })
      ).toBeInTheDocument()
    );
  });
  it('loadItems updates state correctly on success', async () => {
    const mockItems = [{ name: 'bulbasaur', description: 'desc' }];
    const fetchItemsMock = vi.fn().mockResolvedValue(mockItems);

    const appInstance = new App({});
    appInstance.fetchItems = fetchItemsMock;
    appInstance.setState = vi.fn();

    await appInstance.loadItems('bulb');

    expect(appInstance.setState).toHaveBeenNthCalledWith(1, {
      loading: true,
      error: null,
      hasError: false,
    });

    expect(fetchItemsMock).toHaveBeenCalledWith('bulb');

    expect(appInstance.setState).toHaveBeenNthCalledWith(2, {
      loading: false,
      items: mockItems,
      hasError: false,
    });
  });
});
