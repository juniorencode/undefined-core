import { useEffect, useId, useRef, useState } from 'react';
import { Register } from '../../types/global';
import { cn } from '../../utils/styles';
import { InputContainer } from '../InputContainer';

interface InputTextProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'autoComplete'> {
  className?: string;
  label?: string;
  name: string;
  uppercase?: boolean;
  align?: string;
  prefix?: string;
  postfix?: string;
  register: Register;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  focused?: boolean;
  autoComplete?: boolean;
  disabled?: boolean;
}

export const InputText = (props: InputTextProps) => {
  const {
    className,
    label,
    name,
    uppercase,
    align,
    prefix,
    postfix,
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
  const [focus, setFocus] = useState(false);
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChange(uppercase ? e.target.value.toUpperCase() : e.target.value);

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
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
          id={domId}
          type="text"
          name={name}
          value={value !== undefined && value !== null ? value + '' : ''}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          disabled={disabled}
          autoComplete={autoComplete ? 'on' : 'off'}
          {...params}
        />
        {postfix && <span className="mr-2.5">{postfix}</span>}
      </div>
    </InputContainer>
  );
};
