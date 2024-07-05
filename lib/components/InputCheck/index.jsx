import { useId } from 'react';
import { cn } from '../../utils/styles.js';
import { InputContainer } from '../InputContainer';

export const InputCheck = props => {
  const { className, label, name, labelCheck, register, ...params } = props;

  const domId = useId();
  const { errors, value, handleChange } = register(name);

  const onChange = e => handleChange(e.target.checked);

  return (
    <InputContainer
      className={cn(className)}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      <div className="flex items-center">
        <input
          className="w-4 h-4 focus:ring-2 border rounded bg-secondary-100 dark:bg-secondary-700 checked:dark:bg-blue-600 border-secondary-300 dark:border-secondary-600 checked:dark:border-transparent focus:ring-blue-500 dark:focus:ring-blue-500"
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
