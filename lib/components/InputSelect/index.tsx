import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Register } from '../../types/global';
import { useClickOutside } from '../../hooks/useClickOutside.hook';
import { InputContainer } from '../InputContainer';
import { SelectDropdown } from '../SelectDropdown';

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
          <IoIosArrowDown size={16} />
        </button>

        <SelectDropdown
          name={name}
          value={value}
          isOpen={isOpen}
          options={options}
          onChange={onChange}
          setIsOpen={setIsOpen}
        />
        {/* <div className="relative" ref={node => setReferenceElement(node)}>
          {options.length > 0 && isOpen && (
            <div
              className="listbox absolute top-full z-20 mt-2 w-full border rounded-lg shadow-3xl bg-white dark:bg-secondary-700 dark:border-neutral-600 dark:shadow-neutral-900"
              ref={setPopperElement}
              role="listbox"
              style={styles.popper}
              {...attributes.popper}
            >
              <ul className="my-2 max-h-[200px] text-sm overflow-y-auto text-secondary-700 dark:text-secondary-200">
                {options?.map(item => (
                  <li key={item.value}>
                    <input
                      className="hidden"
                      id={item.value}
                      name={name}
                      type="radio"
                      value={item.value}
                      onChange={onChange}
                      onClick={() => setIsOpen(!isOpen)}
                      checked={item.value === value}
                    />
                    <label
                      className={cn(
                        'block px-4 py-2 text-sm cursor-pointer hover:bg-secondary-100 dark:hover:bg-secondary-600 dark:hover:text-white',
                        {
                          'bg-secondary-100 dark:bg-secondary-600':
                            item.value === value
                        }
                      )}
                      htmlFor={item.value}
                    >
                      {item.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div> */}
      </div>
    </InputContainer>
  );
};
