import { cn } from '../../utils/styles.js';
import styles from './styles.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'red' | 'blue';
}

export const Button = (props: ButtonProps) => {
  const { className, color, ...restProps } = props;
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg text-white bg-neutral-700 hover:bg-neutral-600',
        styles.button,
        className,
        {
          'bg-red-700 hover:bg-red-600': color === 'red',
          'bg-blue-700 hover:bg-blue-600': color === 'blue'
        }
      )}
      {...restProps}
    />
  );
};
