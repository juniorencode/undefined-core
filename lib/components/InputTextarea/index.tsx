import { useEffect, useId, useRef, useState } from 'react';
import { Register } from '../../types/glabal';
import { InputContainer } from '../InputContainer';

interface InputTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
  name: string;
  uppercase?: boolean;
  register: Register;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  focused?: boolean;
  disabled?: boolean;
}

export const InputTextarea = (props: InputTextareaProps) => {
  const {
    className,
    label,
    name,
    uppercase,
    register,
    required,
    minLength,
    maxLength,
    focused,
    disabled,
    ...params
  } = props;
  const domId = useId();
  const domRef = useRef<HTMLTextAreaElement>(null);
  const [focus, setFocus] = useState(false);
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

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    handleChange(uppercase ? e.target.value.toUpperCase() : e.target.value);

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      <textarea
        className={`${className} flex gap-2 p-2.5 w-full min-h-12 rounded-lg border bg-secondary-50 border-secondary-300 text-secondary-900 dark:bg-secondary-700 dark:border-secondary-600 dark:placeholder-secondary-400 dark:text-white ${
          focus
            ? 'outline-none ring-2 ring-blue-600 border-blue-600 dark:ring-blue-500 dark:border-blue-500'
            : ''
        } ${!disabled ? 'cursor-text' : ''}`}
        ref={domRef}
        id={domId}
        name={name}
        value={value !== undefined && value !== null ? value + '' : ''}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        disabled={disabled}
        {...params}
      ></textarea>
    </InputContainer>
  );
};
