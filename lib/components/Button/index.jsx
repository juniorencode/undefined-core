import { Link } from 'react-router-dom';
import { cn } from '../../utils/styles';

export const Button = props => {
  const { children, className, type = 'button', to, color, ...params } = props;

  const initialStyles =
    'flex gap-2 items-center justify-center h-10 px-5 py-2.5 text-nowrap font-medium text-sm rounded-lg focus:ring-4 focus:ring-opacity-50 checked:focus:ring-opacity-50 focus:dark:ring-opacity-50 checked:focus:dark:ring-opacity-50 outline-none transition-all';

  const optionsColor = {
    default:
      'text-white bg-primary-600 dark:bg-primary-700 hover:bg-primary-700 dark:hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-800 disabled:bg-primary-300 dark:disabled:bg-primary-400',

    Blue: 'text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 focus:ring-blue-300 dark:focus:ring-blue-800 disabled:bg-blue-300 dark:disabled:bg-blue-400',

    Red: 'text-white bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-800 disabled:bg-red-300 dark:disabled:bg-red-400',

    LightSwitch:
      'text-neutral-900 bg-white hover:bg-neutral-100 border-neutral-200 focus:ring-neutral-100 hover:text-blue-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:border-neutral-600 dark:hover:text-white dark:focus:ring-neutral-700',

    DarkSwitch:
      'text-white bg-neutral-800 hover:bg-neutral-700 border-neutral-600 focus:ring-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 dark:border-neutral-300 dark:hover:border-neutral-600 dark:focus:ring-neutral-100'
  };

  const selectedColor = optionsColor[color ?? 'default'];

  return to ? (
    <Link
      className={cn(initialStyles, selectedColor, className)}
      to={to}
      {...params}
    >
      {children}
    </Link>
  ) : (
    <button
      className={cn(initialStyles, selectedColor, className)}
      role="button"
      type={type}
      {...params}
    >
      {children}
    </button>
  );
};
