import { cn } from '../../utils/styles';

const FormSection = props => {
  const { children, className, title, box } = props;

  return (
    <div
      className={cn(
        'w-full',
        {
          'border rounded-lg border-primary-200 dark:border-primary-800': box
        },
        className
      )}
    >
      {title && (
        <h1
          className={cn('text-xs font-bold tracking-widest uppercase', {
            'p-4 rounded-t-lg dark:bg-opacity-50 text-secondary-500 dark:text-secondary-300 bg-primary-100 dark:bg-primary-800':
              box,
            'py-2 text-primary-500 dark:text-primary-600': !box
          })}
        >
          {title}
        </h1>
      )}
      <div
        className={cn('grid grid-cols-12 gap-4 p-4', {
          'p-0 py-4 border-t border-primary-200 dark:border-primary-800': !box
        })}
      >
        {children}
      </div>
    </div>
  );
};

export { FormSection };
