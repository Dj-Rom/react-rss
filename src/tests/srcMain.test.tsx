import { describe, test, expect, vi } from 'vitest';

const renderMock = vi.fn();
const unmountMock = vi.fn();

vi.mock('react-dom/client', () => ({
  createRoot: () => ({
    render: renderMock,
    unmount: unmountMock,
  }),
}));

describe('index.tsx render test', () => {
  test('createRoot and render are called with correct React tree', async () => {
    await import('../main');

    expect(renderMock).toHaveBeenCalledTimes(1);

    const reactTree = renderMock.mock.calls[0][0];
    const errorBoundaryWrapper = reactTree.props.children;
    expect(errorBoundaryWrapper.type.name).toBe('Provider');
  });
});
