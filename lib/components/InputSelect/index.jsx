import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { cn } from '../../utils/styles';
import { useClickOutside } from '../../hooks/useClickOutside.hook';
import { InputContainer } from '../InputContainer';
import { SelectDropdown } from '../SelectDropdown';

export const InputSelect = props => {
  const {
    className,
    name,
    label,
    options = [],
    firstValue,
    toNumber,
    toBoolean,
    register,
    callback,
    funcDelete,
    required,
    ...params
  } = props;

  const output = toNumber ? 'NUMBER' : toBoolean ? 'BOOLEAN' : 'STRING';
  const {
    errors,
    value: initialValue,
    handleChange
  } = register(name, { required }, output);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const domRef = useClickOutside(() => setIsOpen(false));

  const onChange = e => {
    callback && callback(e.target.value);
    handleChange(e.target.value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!firstValue || options.length < 1) return;
    if (value === options[0].value) return;
    handleChange(options[0].value);
    setValue(options[0].value);
    // eslint-disable-next-line
  }, [options]);

  return (
    <InputContainer
      className={className}
      label={label}
      name={name}
      error={errors[name]?.message}
    >
      <div ref={domRef}>
        <button
          className="flex items-center justify-between p-2.5 w-full h-12 text-sm text-center border focus:ring-4 focus:ring-opacity-40 checked:focus:ring-opacity-40 focus:dark:ring-opacity-40 checked:focus:dark:ring-opacity-40 rounded-lg outline-none transition-all bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-white dark:placeholder-secondary-400 border-secondary-300 dark:border-secondary-600 focus:border-primary-600 dark:focus:border-primary-500 focus:ring-primary-600 dark:focus:ring-primary-500"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          {...params}
        >
          <div className="flex items-center justify-start pr-4 w-full h-full">
            {options?.filter(item => item.value === value)[0]?.label || ''}
          </div>
          <IoIosArrowDown
            className={cn(
              'transition-transform duration-200 text-neutral-500 dark:text-neutral-400',
              {
                'text-primary-500 dark:text-primary-500 rotate-180': isOpen
              }
            )}
            size={16}
          />
        </button>
        <SelectDropdown
          name={name}
          value={value}
          isOpen={isOpen}
          options={options}
          onChange={onChange}
          setIsOpen={setIsOpen}
          funcDelete={funcDelete}
        />
      </div>
    </InputContainer>
  );
};
