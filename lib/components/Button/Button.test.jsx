// Button.test.tsx
import { render, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { Button } from './index';

describe('Button component', () => {
  test('renders the button', () => {
    const { getByRole } = render(<Button>Click Me</Button>);
    const button = getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary-600');
  });

  test('applies additional class names', () => {
    const { container } = render(
      <Button className="custom-class">Click Me</Button>
    );
    const button = container.firstChild;
    expect(button).toHaveClass('custom-class');
  });

  test('applies the blue color class when color prop is provided', () => {
    const { getByRole } = render(<Button color="Blue">Click Me</Button>);
    const button = getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('bg-blue-600');
  });

  test('applies the red color class when color prop is provided', () => {
    const { getByRole } = render(<Button color="Red">Click Me</Button>);
    const button = getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('bg-red-700');
  });

  test('renders as a link when "to" prop is provided', () => {
    const { getByRole } = render(
      <Router>
        <Button to="/home">Go Home</Button>
      </Router>
    );
    const link = getByRole('link', { name: /go home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
  });

  test('executes onClick handler when clicked', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <Button onClick={handleClick}>Click Me</Button>
    );
    const buttonElement = getByRole('button', { name: /click me/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
