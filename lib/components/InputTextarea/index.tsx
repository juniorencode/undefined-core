import { InputContainer } from '../InputContainer';
import { useEffect, useId, useRef, useState } from 'react';

interface InputTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
  name: string;
  uppercase?: boolean;
  prefix?: string;
  postfix?: string;
  register: (
    name: string,
    options?: {
      required?: boolean;
      minLength?: number;
      maxLength?: number;
      isEmail?: boolean;
    }
  ) => {
    errors: Record<string, { message: string }>;
    value: string;
    handleChange: (value: string) => void;
  };
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  disabled?: boolean;
  isFocus?: boolean;
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
    isEmail,
    disabled,
    isFocus,
    ...params
  } = props;
  const domId = useId();
  const domRef = useRef<HTMLTextAreaElement>(null);
  const [focus, setFocus] = useState(false);
  const { errors, value, handleChange } = register(name, {
    required,
    minLength,
    maxLength,
    isEmail
  });

  useEffect(() => {
    if (domRef.current) {
      isFocus && domRef.current.focus();
      isFocus && domRef.current.value && domRef.current.select();
    }
    // eslint-disable-next-line
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = e.target.value;
    if (uppercase) {
      newValue = newValue.toUpperCase();
    }
    handleChange(newValue);
  };

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      {/* <div
        className={`flex gap-2 p-2.5 w-full min-h-12 rounded-lg border bg-secondary-50 border-secondary-300 text-secondary-900 dark:bg-secondary-700 dark:border-secondary-600 dark:placeholder-secondary-400 dark:text-white ${
          focus
            ? 'outline-none ring-2 ring-blue-600 border-blue-600 dark:ring-blue-500 dark:border-blue-500'
            : ''
        } ${!disabled ? 'cursor-text' : ''}`}
        onClick={() => domRef.current.focus()}
      >
        {prefix && <span>{prefix}</span>} */}
      <textarea
        className={`${className} flex gap-2 p-2.5 w-full min-h-12 rounded-lg border bg-secondary-50 border-secondary-300 text-secondary-900 dark:bg-secondary-700 dark:border-secondary-600 dark:placeholder-secondary-400 dark:text-white ${
          focus
            ? 'outline-none ring-2 ring-blue-600 border-blue-600 dark:ring-blue-500 dark:border-blue-500'
            : ''
        } ${!disabled ? 'cursor-text' : ''}`}
        ref={domRef}
        id={domId}
        name={name}
        value={value || ''}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        disabled={disabled}
        {...params}
      ></textarea>
      {/* {postfix && <span>hola{postfix}</span>}
      </div> */}
    </InputContainer>
  );
};
