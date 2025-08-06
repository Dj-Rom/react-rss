import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../pages/About';

describe('About component', () => {
  test('renders about page content', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const section = screen.getByTestId('about-page');
    expect(section).toBeInTheDocument();

    expect(screen.getByText(/Hi, my name is Aleh/i)).toBeInTheDocument();

    expect(screen.getByText(/My Skills:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/JS,TS,PHP,HTML,CSS,SCSS,React,Redux,/i)
    ).toBeInTheDocument();

    const linkToRsSchool = screen.getByRole('link', {
      name: /RS School React Course/i,
    });
    expect(linkToRsSchool).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(linkToRsSchool).toHaveAttribute('target', '_blank');
    expect(linkToRsSchool).toHaveAttribute('rel', 'noreferrer');

    const homeLink = screen.getByRole('link', { name: /Go to home page/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
