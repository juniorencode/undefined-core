import { useEffect, useId, useRef, useState } from 'react';
import { Register } from '../../types/global';
import { InputContainer } from '../InputContainer';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

interface InputPasswordProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'autoComplete'> {
  className?: string;
  label?: string;
  name: string;
  register: Register;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  focused?: boolean;
  autoComplete?: boolean;
  disabled?: boolean;
}

export const InputPassword = (props: InputPasswordProps) => {
  const {
    className,
    label,
    name,
    register,
    required,
    minLength,
    maxLength,
    focused,
    autoComplete,
    disabled,
    ...params
  } = props;
  const domId = useId();
  const domRef = useRef<HTMLInputElement>(null);
  const [isHidden, setIsHidden] = useState(true);
  const { errors, value, handleChange } = register(name, {
    required,
    minLength,
    maxLength
  });

  useEffect(() => {
    if (domRef.current) {
      focused && domRef.current.focus();
      focused && domRef.current.value && domRef.current.select();
    }
    // eslint-disable-next-line
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChange(e.target.value);

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      <div className="relative">
        <input
          className="p-2.5 pr-12 w-full h-12 sm:text-sm border rounded-lg outline-none focus:ring-2 text-secondary-900 dark:text-white bg-secondary-50 dark:bg-secondary-700 border-secondary-300 dark:border-secondary-600 dark:placeholder-secondary-400 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-blue-600 dark:focus:border-blue-500"
          ref={domRef}
          role="textbox"
          id={domId}
          type={isHidden ? 'password' : 'text'}
          name={name}
          value={value !== undefined && value !== null ? value + '' : ''}
          onChange={onChange}
          autoComplete={autoComplete ? 'on' : 'off'}
          disabled={disabled}
          {...params}
        />
        <button
          className="absolute top-0 end-0 flex items-center justify-center w-12 h-full rounded-e-lg dark:focus:outline-none text-neutral-400"
          role="button"
          type="button"
          onClick={() => setIsHidden(prev => !prev)}
        >
          {isHidden ? (
            <IoEyeOutline size={18} />
          ) : (
            <IoEyeOffOutline size={18} />
          )}
        </button>
      </div>
    </InputContainer>
  );
};
