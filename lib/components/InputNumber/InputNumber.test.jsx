import { render } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { InputNumber } from './index';

const mockRegister = (errors = {}) => ({
  errors,
  value: '',
  handleChange: vi.fn()
});

describe('InputNumber component', () => {
  test('renders label when provided', () => {
    const { getByLabelText } = render(
      <InputNumber name="test" label="Test Label" register={mockRegister} />
    );
    expect(getByLabelText('Test Label')).toBeInTheDocument();
  });

  test('applies additional class names', () => {
    const { container } = render(
      <InputNumber
        className="custom-class"
        name="test"
        register={mockRegister}
      />
    );
    const div = container.firstChild;
    expect(div).toHaveClass('custom-class');
  });

  test('does not render label when not provided', () => {
    const { container } = render(
      <InputNumber name="test" register={mockRegister} />
    );
    const label = container.querySelector('label');
    expect(label).toBeNull();
  });

  test('renders prefix when provided', () => {
    const { getByText } = render(
      <InputNumber name="test" prefix="Prefix" register={mockRegister} />
    );
    expect(getByText('Prefix')).toBeInTheDocument();
  });

  test('renders postfix when provided', () => {
    const { getByText } = render(
      <InputNumber name="test" postfix="Postfix" register={mockRegister} />
    );
    expect(getByText('Postfix')).toBeInTheDocument();
  });

  test('focuses the input when focused prop is true', () => {
    const { getByRole } = render(
      <InputNumber name="test" register={mockRegister} focused />
    );
    const input = getByRole('textbox');
    expect(input).toHaveFocus();
  });

  test('disables the input when disabled prop is true', () => {
    const { getByRole } = render(
      <InputNumber name="test" register={mockRegister} disabled />
    );
    const input = getByRole('textbox');
    expect(input).toBeDisabled();
  });

  test('displays error message when provided', () => {
    const { getByText } = render(
      <InputNumber
        name="test"
        register={() => mockRegister({ test: { message: 'Error message' } })}
      />
    );
    expect(getByText('Error message')).toBeInTheDocument();
  });

  test('passes additional props to the input element', () => {
    const { getByRole } = render(
      <InputNumber
        name="test"
        register={mockRegister}
        data-testid="input-number"
      />
    );
    const input = getByRole('textbox');
    expect(input).toHaveAttribute('data-testid', 'input-number');
  });
});
