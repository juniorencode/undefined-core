import { useEffect, useId, useRef } from 'react';
import { Register } from '../../types/global';
import { InputContainer } from '../InputContainer';
import { cn } from '../../utils/styles';

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
        className={cn(
          'flex gap-2 p-2.5 w-full min-h-12 rounded-lg border outline-none focus:ring-2 bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-white border-secondary-300 dark:border-secondary-600 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-blue-600 dark:focus:ring-blue-500 dark:placeholder-secondary-400',
          className
        )}
        ref={domRef}
        id={domId}
        name={name}
        value={value !== undefined && value !== null ? value + '' : ''}
        onChange={onChange}
        disabled={disabled}
        {...params}
      ></textarea>
    </InputContainer>
  );
};
