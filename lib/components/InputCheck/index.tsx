import { cn } from '../../utils/styles.js';
import { InputContainer } from '../InputContainer/index.js';
import { useId } from 'react';

interface InputCheckProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  name: string;
  labelCheck?: string;
  register: (name: string) => {
    errors: Record<string, { message: string }>;
    value: boolean;
    handleChange: (value: boolean) => void;
  };
}

export const InputCheck = (props: InputCheckProps) => {
  const { className, label, name, labelCheck, register, ...params } = props;
  const domId = useId();
  const { errors, value, handleChange } = register(name);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChange(e.target.checked);
  return (
    <InputContainer
      className={cn(className)}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      <div className="flex items-center">
        <input
          className="w-4 h-6 text-blue-600 bg-secondary-100 border-secondary-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-secondary-800 focus:ring-2 dark:bg-secondary-700 dark:border-secondary-600"
          id={domId}
          type="checkbox"
          checked={value || false}
          onChange={onChange}
          {...params}
        />
        <label
          className="ms-2 text-sm font-medium text-secondary-900 dark:text-secondary-300"
          htmlFor={name}
        >
          {labelCheck}
        </label>
      </div>
    </InputContainer>
  );
};
