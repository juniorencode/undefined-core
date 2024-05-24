import { render } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { InputTextarea } from './index';

const mockRegister = (errors = {}) => ({
  errors,
  value: '',
  handleChange: vi.fn()
});

describe('InputTextarea component', () => {
  test('renders label when provided', () => {
    const { getByLabelText } = render(
      <InputTextarea name="test" label="Test Label" register={mockRegister} />
    );
    expect(getByLabelText('Test Label')).toBeInTheDocument();
  });

  test('applies additional class names', () => {
    const { container } = render(
      <InputTextarea
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
      <InputTextarea name="test" register={mockRegister} />
    );
    const label = container.querySelector('label');
    expect(label).toBeNull();
  });

  test('focuses the textarea when focused prop is true', () => {
    const { getByRole } = render(
      <InputTextarea name="test" register={mockRegister} focused />
    );
    const textarea = getByRole('textbox');
    expect(textarea).toHaveFocus();
  });

  test('disables the textarea when disabled prop is true', () => {
    const { getByRole } = render(
      <InputTextarea name="test" register={mockRegister} disabled />
    );
    const textarea = getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  test('displays error message when provided', () => {
    const { getByText } = render(
      <InputTextarea
        name="test"
        register={() => mockRegister({ test: { message: 'Error message' } })}
      />
    );
    expect(getByText('Error message')).toBeInTheDocument();
  });

  test('passes additional props to the input element', () => {
    const { getByRole } = render(
      <InputTextarea
        name="test"
        register={mockRegister}
        data-testid="input-text"
      />
    );
    const input = getByRole('textbox');
    expect(input).toHaveAttribute('data-testid', 'input-text');
  });
});
