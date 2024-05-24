import { render } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { InputCheck } from './index';

const mockRegister = (errors = {}) => ({
  errors,
  value: '',
  handleChange: vi.fn()
});

describe('InputCheck component', () => {
  test('applies additional class names', () => {
    const { container } = render(
      <InputCheck
        className="custom-class"
        name="test"
        register={mockRegister}
      />
    );
    const div = container.firstChild;
    expect(div).toHaveClass('custom-class');
  });

  test('renders label when provided', () => {
    const { getByText } = render(
      <InputCheck name="test" label="Test Label" register={mockRegister} />
    );
    expect(getByText('Test Label')).toBeInTheDocument();
  });

  test('does not render label when not provided', () => {
    const { container } = render(
      <InputCheck name="test" register={mockRegister} />
    );
    const label = container.querySelector('label');
    expect(label).toBeNull();
  });

  test('renders labelCheck when provided', () => {
    const { getByText } = render(
      <InputCheck
        name="test"
        labelCheck="Test Label Check"
        register={mockRegister}
      />
    );
    expect(getByText('Test Label Check')).toBeInTheDocument();
  });

  test('does not render labelCheck when not provided', () => {
    const { container } = render(
      <InputCheck name="test" register={mockRegister} />
    );
    const labelCheck = container.querySelector('label');
    expect(labelCheck).toBeNull();
  });

  test('displays error message when provided', () => {
    const { getByText } = render(
      <InputCheck
        name="test"
        register={() => mockRegister({ test: { message: 'Error message' } })}
      />
    );
    expect(getByText('Error message')).toBeInTheDocument();
  });

  test('passes additional props to the input element', () => {
    const { getByRole } = render(
      <InputCheck
        name="test"
        register={mockRegister}
        data-testid="input-text"
      />
    );
    const input = getByRole('checkbox');
    expect(input).toHaveAttribute('data-testid', 'input-text');
  });
});
