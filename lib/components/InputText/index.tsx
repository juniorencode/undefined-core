import { useEffect, useId, useRef, useState } from 'react';
import { Register } from '../../types/global';
import { cn } from '../../utils/styles';
import { InputContainer } from '../InputContainer';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  name: string;
  uppercase?: boolean;
  prefix?: string;
  postfix?: string;
  register: Register;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  focused?: boolean;
  disabled?: boolean;
}

export const InputText = (props: InputTextProps) => {
  const {
    className,
    label,
    name,
    uppercase,
    prefix,
    postfix,
    register,
    required,
    minLength,
    maxLength,
    isEmail,
    focused,
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
          'flex gap-2 p-2.5 w-full h-12 border rounded-lg bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-white border-secondary-300 dark:border-secondary-600 dark:placeholder-secondary-400',
          {
            'outline-none ring-2 ring-blue-600 dark:ring-blue-500 border-blue-600 dark:border-blue-500':
              focus,
            'cursor-text': !disabled
          }
        )}
        onClick={() => domRef.current && domRef.current.focus()}
      >
        {prefix && <span>{prefix}</span>}
        <input
          className="w-full text-sm focus:outline-none bg-transparent"
          ref={domRef}
          id={domId}
          type="text"
          name={name}
          value={value !== undefined && value !== null ? value + '' : ''}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          disabled={disabled}
          {...params}
        />
        {postfix && <span>{postfix}</span>}
      </div>
    </InputContainer>
  );
};
