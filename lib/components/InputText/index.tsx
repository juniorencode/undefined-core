import { useEffect, useId, useRef, useState } from 'react';
import { Register } from '../../types/global';
import { cn } from '../../utils/styles';
import { InputContainer } from '../InputContainer';
import { SelectDropdown } from '../SelectDropdown';
import { useClickOutside } from '../../hooks/useClickOutside.hook';

interface InputTextProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'autoComplete'> {
  className?: string;
  name: string;
  label?: string;
  options?: Option[];
  uppercase?: boolean;
  align?: string;
  prefix?: string;
  postfix?: string;
  funcDelete?: (id: string) => void;
  register: Register;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  focused?: boolean;
  autoComplete?: boolean;
  disabled?: boolean;
}

interface Option {
  value: string;
  label: string;
}

export const InputText = (props: InputTextProps) => {
  const {
    className,
    name,
    label,
    options = [],
    uppercase,
    align,
    prefix,
    postfix,
    funcDelete,
    register,
    required,
    minLength,
    maxLength,
    isEmail,
    focused,
    autoComplete,
    disabled,
    ...params
  } = props;
  const domId = useId();
  const domRef = useRef<HTMLInputElement>(null);
  const domRef2 = useClickOutside(() => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const { errors, value, handleChange } = register(name, {
    required,
    minLength,
    maxLength,
    isEmail
  });

  useEffect(() => {
    if (domRef.current) {
      focused && domRef.current.focus();
      focused && domRef.current.value && domRef.current.select();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!value) setFilteredOptions(options);
    if (!value || !options) return;
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes((value + '').toLowerCase())
    );
    setFilteredOptions(filtered);
    // eslint-disable-next-line
  }, [value]);

  const handleOpen = () => setIsOpen(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChange(uppercase ? e.target.value.toUpperCase() : e.target.value);

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      <div ref={domRef2}>
        <div
          className={cn(
            'flex items-center w-full border rounded-lg overflow-hidden bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-white border-secondary-300 dark:border-secondary-600 dark:placeholder-secondary-400',
            {
              'ring-2 ring-blue-600 dark:ring-blue-500 border-blue-600 dark:border-blue-500':
                focus,
              'cursor-text': !disabled
            }
          )}
          onClick={() => domRef.current && domRef.current.focus()}
        >
          {prefix && <span className="ml-2.5">{prefix}</span>}
          <input
            className={cn(
              'p-2.5 w-full h-12 text-sm outline-none bg-transparent',
              {
                'text-left': align === 'left',
                'text-center': align === 'center',
                'text-right': align === 'right'
              }
            )}
            ref={domRef}
            role="textbox"
            id={domId}
            type="text"
            name={name}
            value={value !== undefined && value !== null ? value + '' : ''}
            onChange={onChange}
            onClick={handleOpen}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            autoComplete={autoComplete ? 'on' : 'off'}
            disabled={disabled}
            {...params}
          />
          {postfix && <span className="mr-2.5">{postfix}</span>}
        </div>
        <SelectDropdown
          name={name}
          value={value}
          isOpen={isOpen}
          options={filteredOptions}
          onChange={onChange}
          setIsOpen={setIsOpen}
          funcDelete={funcDelete}
        />
      </div>
    </InputContainer>
  );
};
