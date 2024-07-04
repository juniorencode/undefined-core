import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Register } from '../../types/global';
import { useClickOutside } from '../../hooks/useClickOutside.hook';
import { InputContainer } from '../InputContainer';
import { SelectDropdown } from '../SelectDropdown';
import { cn } from '../../utils/styles';

interface InputSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  label?: string;
  name: string;
  options: Option[];
  firstValue?: boolean;
  toNumber?: boolean;
  toBoolean?: boolean;
  callback?: (value: string) => void;
  funcDelete?: (id: string) => void;
  register: Register;
  required?: boolean;
}

interface Option {
  value: string;
  label: string;
}

export const InputSelect = (props: InputSelectProps) => {
  const {
    className,
    label,
    name,
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    callback && callback(e.target.value);
    handleChange(e.target.value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!firstValue || options.length < 1) return;
    if (value === options[0].value) return;
    setValue(options[0].value);
    handleChange(options[0].value);
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
          className="flex items-center justify-between p-2.5 w-full h-12 focus:ring-2 focus:outline-none rounded-lg text-sm text-center border bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-white border-secondary-300 dark:border-secondary-600 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-blue-600 dark:focus:ring-blue-500 dark:placeholder-secondary-400"
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
                'rotate-180': isOpen
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
