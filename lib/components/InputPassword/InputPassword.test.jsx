import { fireEvent, render } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { InputPassword } from './index';

const mockRegister = (errors = {}) => ({
  errors,
  value: '',
  handleChange: vi.fn()
});

describe('InputPassword component', () => {
  test('renders label when provided', () => {
    const { getByLabelText } = render(
      <InputPassword name="test" label="Test Label" register={mockRegister} />
    );
    expect(getByLabelText('Test Label')).toBeInTheDocument();
  });

  test('applies additional class names', () => {
    const { container } = render(
      <InputPassword
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
      <InputPassword name="test" register={mockRegister} />
    );
    const label = container.querySelector('label');
    expect(label).toBeNull();
  });

  test('toggles password visibility when button is clicked', () => {
    const { getByRole } = render(
      <InputPassword name="test" register={mockRegister} />
    );
    const input = getByRole('textbox');
    const button = getByRole('button');

    // Initially password should be hidden
    expect(input).toHaveAttribute('type', 'password');

    // Click to show password
    fireEvent.click(button);
    expect(input).toHaveAttribute('type', 'text');

    // Click to hide password
    fireEvent.click(button);
    expect(input).toHaveAttribute('type', 'password');
  });

  test('focuses the input when focused prop is true', () => {
    const { getByRole } = render(
      <InputPassword name="test" register={mockRegister} focused />
    );
    const input = getByRole('textbox');
    expect(input).toHaveFocus();
  });

  test('disables the input when disabled prop is true', () => {
    const { getByRole } = render(
      <InputPassword name="test" register={mockRegister} disabled />
    );
    const input = getByRole('textbox');
    expect(input).toBeDisabled();
  });

  test('displays error message when provided', () => {
    const { getByText } = render(
      <InputPassword
        name="test"
        register={() => mockRegister({ test: { message: 'Error message' } })}
      />
    );
    expect(getByText('Error message')).toBeInTheDocument();
  });

  test('passes additional props to the input element', () => {
    const { getByRole } = render(
      <InputPassword
        name="test"
        register={mockRegister}
        data-testid="input-password"
      />
    );
    const input = getByRole('textbox');
    expect(input).toHaveAttribute('data-testid', 'input-password');
  });
});
