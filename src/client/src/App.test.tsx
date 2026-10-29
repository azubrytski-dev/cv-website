import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

jest.mock('./components/PortfolioGrid', () => {
  return function MockPortfolioGrid() {
    return <div>CV content</div>;
  };
});

beforeEach(() => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: true,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
});

it('shows only CV navigation and content', () => {
  render(<App />);

  const navigation = screen.getByRole('navigation', { name: 'Main navigation' });
  expect(within(navigation).getAllByRole('link').map(link => link.getAttribute('href'))).toEqual(['/', '#overview', '#experience', '#skills', '#education']);
  expect(within(navigation).getByRole('link', { name: 'Andrei Zubrytski' })).toHaveAttribute('href', '/');
  expect(within(screen.getByRole('main')).getByText('CV content')).toBeInTheDocument();
});

it('switches the shared theme without leaving the CV', () => {
  const { container } = render(<App />);
  const themeScope = container.querySelector('[data-cv-theme]');
  expect(themeScope).toHaveAttribute('data-cv-theme', 'dark');

  fireEvent.click(screen.getByRole('button', { name: 'toggle theme' }));
  expect(themeScope).toHaveAttribute('data-cv-theme', 'light');
  expect(screen.getByText('CV content')).toBeInTheDocument();
});
