import { cn } from '../../utils/styles.js';
interface InputContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  label?: string;
  name: string;
  error?: string;
}

export const InputContainer = (props: InputContainerProps) => {
  const { className, children, label, name, error = '' } = props;
  return (
    <div className={cn(className)}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 w-min text-sm font-medium text-nowrap text-secondary-900 dark:text-white"
        >
          {label}
        </label>
      )}
      {children}
      <span className="flex justify-end mt-1 h-2 text-xs text-red-600 dark:text-red-400">
        {error}
      </span>
    </div>
  );
};
