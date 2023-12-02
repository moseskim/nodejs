import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Users link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Users/i);
  expect(linkElement).toBeInTheDocument();
});
