import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  to?: string;
  color?: 'Blue' | 'Red' | 'LightSwitch' | 'DarkSwitch';
}

export const Button = (props: ButtonProps) => {
  const { children, className, type = 'button', to, color, ...params } = props;

  const initialStyles =
    'flex gap-2 items-center justify-center h-10 px-5 py-2.5 text-nowrap font-medium text-sm rounded-lg focus:ring-4 focus:outline-none';

  const optionsColor = {
    default:
      'text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 disabled:bg-primary-300 dark:bg-primary-700 dark:hover:bg-primary-800 dark:focus:ring-primary-800 dark:disabled:bg-primary-400',
    Blue: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 disabled:bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:bg-blue-300',
    Red: 'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 disabled:bg-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 dark:disabled:bg-red-300',
    LightSwitch:
      'text-secondary-900 bg-white hover:bg-secondary-100 border-secondary-200 focus:ring-secondary-100 hover:text-blue-700 dark:bg-secondary-800 dark:hover:bg-secondary-700 dark:text-secondary-400 dark:border-secondary-600  dark:hover:text-white dark:focus:ring-secondary-700',
    DarkSwitch:
      'text-white bg-secondary-800 hover:bg-secondary-700 border-secondary-600 focus:ring-secondary-700 dark:bg-white dark:text-secondary-900 dark:hover:bg-secondary-200 dark:border-secondary-300 dark:hover:border-secondary-600 dark:focus:ring-secondary-100'
  };

  const selectedColor = optionsColor[color ?? 'default'];

  return to ? (
    <Link
      className={cn(initialStyles, selectedColor, className)}
      to={to}
      {...(params as AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {children}
    </Link>
  ) : (
    <button
      className={cn(initialStyles, selectedColor, className)}
      role="button"
      type={type}
      {...(params as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};
