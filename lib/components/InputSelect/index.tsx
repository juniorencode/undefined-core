import { useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { IoIosArrowDown } from 'react-icons/io';
import { Register } from '../../types/glabal';
import { useClickOutside } from '../../hooks/useClickOutside.hook';
import { InputContainer } from '../InputContainer';

interface InputSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  label?: string;
  name: string;
  options: Option[];
  firstValue?: boolean;
  toNumber?: boolean;
  toBoolean?: boolean;
  register: Register;
  required?: boolean;
  callback?: (value: string) => void;
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
    required,
    callback,
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
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const domRef = useClickOutside(() => setIsOpen(false));
  // const domRef = useRef<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: isOpen ? 'bottom-start' : 'top-start'
  });

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
        <div className="relative" ref={node => setReferenceElement(node)}>
          {options.length > 0 && isOpen && (
            <div
              className="absolute top-full my-2 w-full z-20 rounded-lg shadow-3xl dark:shadow-neutral-900 bg-white dark:bg-secondary-700"
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <ul className="py-2 text-sm max-h-52 overflow-y-auto text-secondary-700 dark:text-secondary-200">
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
                      className="block px-4 py-2 cursor-pointer hover:bg-secondary-100 dark:hover:bg-secondary-600 dark:hover:text-white"
                      htmlFor={item.value}
                    >
                      {item.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            className="flex items-center justify-between p-2.5 w-full h-12 focus:ring-1 focus:outline-none rounded-lg text-sm text-center border bg-secondary-50 border-secondary-300 text-secondary-900 focus:ring-blue-600 focus:border-blue-600 dark:bg-secondary-700 dark:border-secondary-600 dark:placeholder-secondary-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            {...params}
          >
            {options?.filter(item => item.value === value)[0]?.label ||
              '\u00a0'}
            <IoIosArrowDown size={16} />
          </button>
        </div>
      </div>
    </InputContainer>
  );
};
