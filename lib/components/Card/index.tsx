import { cn } from '../../utils/styles.js';
// import styles from './styles.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card = (props: CardProps) => {
  const { className, children } = props;
  return (
    <div
      className={cn(
        'block bg-white border border-secondary-200 rounded-lg shadow dark:bg-secondary-800 dark:border-secondary-700',
        className
      )}
    >
      {children}
    </div>
  );
};
