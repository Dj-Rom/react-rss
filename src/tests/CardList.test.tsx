import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import CardList from './../components/CardList';

vi.mock('./../css/main.module.css', () => ({
  default: {
    cardList: 'cardList_mock',
  },
}));

interface CardProps {
  name: string;
  description: string;
  onItemClick: (name: string) => void;
}

vi.mock('./Card', () => ({
  default: ({ name, description, onItemClick }: CardProps) => (
    <div onClick={() => onItemClick(name)}>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  ),
}));

describe('CardList', () => {
  const items = [
    { name: 'Item 1', description: 'Description 1' },
    { name: 'Item 2', description: 'Description 2' },
  ];
  const mockClick = vi.fn();

  beforeEach(() => {
    mockClick.mockClear();
  });

  it('renders container with correct class and test ID', () => {
    const { container } = render(
      <CardList items={items} onItemClick={mockClick} />
    );
    const cardContainer = screen.getByTestId('card');
    expect(cardContainer).toHaveClass('cardList_mock');
    expect(container.firstChild).toBe(cardContainer);
  });

  it('renders all items as cards', () => {
    render(<CardList items={items} onItemClick={mockClick} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('calls onItemClick with correct name when a card is clicked', () => {
    render(<CardList items={items} onItemClick={mockClick} />);
    fireEvent.click(screen.getByText('Item 2'));
    expect(mockClick).toHaveBeenCalledWith('Item 2');
  });
});
