import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './pages/Home/home';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
