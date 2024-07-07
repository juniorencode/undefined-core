import { useEffect, useRef, useState } from 'react';
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
  const [focusClick, setFocusClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const domRef = useClickOutside(() => setIsOpen(false));

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

  const onChange = e => {
    callback && callback(e.target.value);
    handleChange(e.target.value);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    setFocusClick(true);
    setIsOpen(false);
  };

  const handleClick = () => {
    if (!focusClick) {
      setFocusClick(false);
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <InputContainer
      className={className}
      label={label}
      name={name}
      error={errors[name]?.message}
    >
      <div ref={domRef}>
        <button
          className={cn(
            'flex items-center justify-between p-2.5 w-full h-12 text-sm text-center border focus:ring-4 focus:ring-opacity-30 checked:focus:ring-opacity-30 focus:dark:ring-opacity-40 checked:focus:dark:ring-opacity-40 rounded-lg outline-none transition-all bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-white dark:placeholder-secondary-400 border-secondary-300 dark:border-secondary-600 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-primary-600 dark:focus:ring-primary-500',
            {
              'ring-4 ring-opacity-30 checked:ring-opacity-30 dark:ring-opacity-40 checked:dark:ring-opacity-40 border-primary-500 dark:border-primary-500 ring-primary-600 dark:ring-primary-500':
                isOpen
            }
          )}
          type="button"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
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
