import { useId } from 'react';
import { Register } from '../../types/global.js';
import { cn } from '../../utils/styles.js';
import { InputContainer } from '../InputContainer/';

interface InputCheckProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  name: string;
  labelCheck?: string;
  register: Register;
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
          className="w-4 h-4 focus:ring-2 border rounded text-blue-600 bg-secondary-100 dark:bg-secondary-700 border-secondary-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-secondary-800 dark:border-secondary-600"
          id={domId}
          type="checkbox"
          checked={typeof value === 'boolean' ? value : false}
          onChange={onChange}
          {...params}
        />
        {labelCheck && (
          <label
            className="ml-2 text-sm font-medium text-secondary-900 dark:text-secondary-300"
            htmlFor={name}
          >
            {labelCheck}
          </label>
        )}
      </div>
    </InputContainer>
  );
};
