import { useId, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside.hook';
import { InputContainer } from '../InputContainer';
import { cn } from '../../utils/styles';

export const InputSwitch = props => {
  const { className, name, label, labelCheck, register, ...params } = props;

  const domId = useId();
  const [focus, setFocus] = useState(false);
  const domRef = useClickOutside(() => setFocus(false));
  const { errors, value, handleChange } = register(name);

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      <div className="flex items-center" ref={domRef}>
        <label
          className="inline-flex items-center cursor-pointer"
          onClick={() => setFocus(true)}
        >
          <input
            type="checkbox"
            className="hidden peer"
            checked={value || false}
            onChange={() => handleChange(!value)}
            {...params}
          />
          <div
            className={cn(
              'relative after:content-[""] after:absolute after:top-[2px] after:start-[2px] w-[42px] h-[24px] after:h-[18px] after:w-[18px] border after:border peer-focus:ring-2 rounded-full after:rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full outline-none peer-focus:outline-none transition-all after:transition-all bg-secondary-200 after:bg-white dark:bg-secondary-700 after:border-neutral-300 border-secondary-300 dark:border-secondary-800 peer-focus:ring-blue-500 dark:peer-focus:ring-blue-500 peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:after:border-white',
              {
                'ring-2 border-blue-500 dark:border-blue-500 peer-checked:border-blue-500 peer-checked:dark:border-blue-500 ring-blue-500 dark:ring-blue-500':
                  focus
              }
            )}
          ></div>
          {labelCheck && (
            <span className="ms-3 text-sm font-medium text-neutral-900 dark:text-neutral-300">
              {labelCheck}
            </span>
          )}
        </label>
      </div>
    </InputContainer>
  );
};
