import { render, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { InputSelect } from './index';

const mockRegister = (errors = {}) => ({
  errors,
  value: '',
  handleChange: vi.fn()
});

describe('InputSelect component', () => {
  test('renders label when provided', () => {
    const { getByText } = render(
      <InputSelect name="test" label="Test Label" register={mockRegister} />
    );
    expect(getByText('Test Label')).toBeInTheDocument();
  });

  test('does not render label when not provided', () => {
    const { container } = render(
      <InputSelect name="test" register={mockRegister} />
    );
    const label = container.querySelector('label');
    expect(label).toBeNull();
  });

  test('opens dropdown on button click', () => {
    const { getByRole } = render(
      <InputSelect
        name="test"
        options={[{ value: '1', label: 'Option 1' }]}
        register={mockRegister}
      />
    );
    const button = getByRole('button');
    fireEvent.click(button);
    const dropdown = getByRole('listbox');
    expect(dropdown).toBeInTheDocument();
  });

  test('closes dropdown on second button click', () => {
    const { container, getByRole } = render(
      <InputSelect
        name="test"
        options={[{ value: '1', label: 'Option 1' }]}
        register={mockRegister}
      />
    );
    const button = getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    const dropdown = container.querySelector('.listbox');
    expect(dropdown).not.toBeInTheDocument();
  });

  test('displays the correct options in the dropdown', () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' }
    ];
    const { getByRole, getByText } = render(
      <InputSelect name="test" options={options} register={mockRegister} />
    );
    const button = getByRole('button');
    fireEvent.click(button);

    options.forEach(option => {
      expect(getByText(option.label)).toBeInTheDocument();
    });
  });

  test('displays error message when provided', () => {
    const { getByText } = render(
      <InputSelect
        name="test"
        register={() => mockRegister({ test: { message: 'Error message' } })}
      />
    );
    expect(getByText('Error message')).toBeInTheDocument();
  });

  test('passes additional props to the input element', () => {
    const { getByRole } = render(
      <InputSelect
        name="test"
        register={mockRegister}
        data-testid="input-text"
      />
    );
    const input = getByRole('button');
    expect(input).toHaveAttribute('data-testid', 'input-text');
  });
});
