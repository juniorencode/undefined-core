import { useId } from 'react';
import { cn } from '../../utils/styles.js';
import { InputContainer } from '../InputContainer';

export const InputCheck = props => {
  const { className, name, label, labelCheck, register, ...params } = props;

  const domId = useId();
  const { errors, value, handleChange } = register(name, {}, 'BOOLEAN');

  const onChange = e => handleChange(e.target.checked.toString());

  return (
    <InputContainer
      className={cn(className)}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      <div className="flex items-center w-fit cursor-pointer">
        <input
          className="w-6 h-6 border focus:ring-4 focus:ring-opacity-40 checked:focus:ring-opacity-40 focus:dark:ring-opacity-40 checked:focus:dark:ring-opacity-40 rounded cursor-pointer transition-all bg-secondary-200 dark:bg-secondary-700 checked:bg-primary-600 checked:dark:bg-primary-600 border-secondary-300 dark:border-secondary-600 focus:border-primary-500 focus:dark:border-primary-500 checked:border-primary-600 checked:dark:border-primary-600 checked:focus:border-primary-500 checked:focus:dark:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-500"
          id={domId}
          name={name}
          type="checkbox"
          checked={value === 'true' ? true : false}
          onChange={onChange}
          {...params}
        />
        {labelCheck && (
          <label
            className="ml-2 px-2 text-sm font-medium cursor-pointer text-neutral-900 dark:text-neutral-300"
            htmlFor={domId}
          >
            {labelCheck}
          </label>
        )}
      </div>
    </InputContainer>
  );
};
