import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Button } from './index';

const renderButton = props => {
  const { container } = render(<Button {...props} />);
  return container.querySelector('button');
};

const buttonStyles = {
  default:
    'px-4 py-2 rounded-lg text-white bg-neutral-700 hover:bg-neutral-600',
  red: 'bg-red-700 hover:bg-red-600',
  blue: 'bg-blue-700 hover:bg-blue-600'
};

test('renders button with correct styles and props', () => {
  const button = renderButton({ children: 'Default Button' });

  expect(button).toBeInTheDocument();
  expect(button).toHaveClass(buttonStyles.default);
  expect(button).not.toHaveClass(buttonStyles.red);
  expect(button).not.toHaveClass(buttonStyles.blue);
});

test('renders button with red color', () => {
  const button = renderButton({ children: 'Red Button', color: 'red' });

  expect(button).toBeInTheDocument();
  expect(button).toHaveClass(buttonStyles.red);
  expect(button).not.toHaveClass(buttonStyles.default);
});

test('renders button with blue color', () => {
  const button = renderButton({ children: 'Blue Button', color: 'blue' });

  expect(button).toBeInTheDocument();
  expect(button).toHaveClass(buttonStyles.blue);
  expect(button).not.toHaveClass(buttonStyles.default);
});
