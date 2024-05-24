import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { InputContainer } from './index';

describe('InputContainer component', () => {
  test('renders children correctly', () => {
    const { getByText } = render(
      <InputContainer name="test">Test Content</InputContainer>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  test('applies additional class names', () => {
    const { container } = render(
      <InputContainer className="custom-class" name="test">
        Test Content
      </InputContainer>
    );
    const div = container.firstChild;
    expect(div).toHaveClass('custom-class');
  });

  test('renders label when provided', () => {
    const { getByText } = render(
      <InputContainer name="test" label="Test Label">
        Test Content
      </InputContainer>
    );
    expect(getByText('Test Label')).toBeInTheDocument();
    expect(getByText('Test Label').tagName).toBe('LABEL');
  });

  test('does not render label when not provided', () => {
    const { container } = render(
      <InputContainer name="test">Test Content</InputContainer>
    );
    const label = container.querySelector('label');
    expect(label).toBeNull();
  });

  test('renders error message when provided', () => {
    const { getByText } = render(
      <InputContainer name="test" error="Error Message">
        Test Content
      </InputContainer>
    );
    expect(getByText('Error Message')).toBeInTheDocument();
    expect(getByText('Error Message')).toHaveClass('text-red-600');
  });

  test('does not render error message when not provided', () => {
    const { container } = render(
      <InputContainer name="test">Test Content</InputContainer>
    );
    const errorSpan = container.querySelector('span');
    expect(errorSpan).toBeInTheDocument();
    expect(errorSpan.textContent).toBe('');
  });

  test('passes additional props to the div element', () => {
    const { container } = render(
      <InputContainer name="test" data-testid="input-container">
        Test Content
      </InputContainer>
    );
    const div = container.firstChild;
    expect(div).toHaveAttribute('data-testid', 'input-container');
  });
});
