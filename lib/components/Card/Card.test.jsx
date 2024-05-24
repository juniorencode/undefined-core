import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Card } from './index';

describe('Card component', () => {
  test('renders children correctly', () => {
    const { getByText } = render(<Card>Test Content</Card>);
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  test('applies additional class names', () => {
    const { container } = render(
      <Card className="custom-class">Test Content</Card>
    );
    const div = container.firstChild;
    expect(div).toHaveClass('custom-class');
  });

  test('passes additional props to the div element', () => {
    const { container } = render(<Card data-testid="card">Test Content</Card>);
    const div = container.firstChild;
    expect(div).toHaveAttribute('data-testid', 'card');
  });
});
