import { useId, useRef, useState } from 'react';
import { InputContainer } from '../InputContainer';

interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  name: string;
  prefix?: string;
  postfix?: string;
  register: (
    name: string,
    options?: InputNumberRegisterOptions
  ) => {
    errors: Record<string, { message: string }>;
    value: number | string;
    handleChange: (value: number | string) => void;
  };
  required?: boolean;
  minValue?: number;
  maxValue?: number;
  disabled?: boolean;
}

interface InputNumberRegisterOptions {
  required?: boolean;
  minValue?: number;
  maxValue?: number;
}

export const InputNumber = (props: InputNumberProps) => {
  const {
    className,
    label,
    name,
    prefix,
    postfix,
    register,
    required,
    minValue,
    maxValue,
    disabled,
    ...params
  } = props;
  const domId = useId();
  const domRef = useRef<HTMLInputElement | null>(null);
  const [focus, setFocus] = useState(false);
  const { errors, value, handleChange } = register(name, {
    required,
    minValue,
    maxValue
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value
      .replace(/[^\d.-]/g, '')
      .replace(/^(\d*\.\d*).*$/, '$1');

    if (newValue.includes('-') && !newValue.startsWith('-'))
      newValue = newValue.replace(/-/g, '');

    if (newValue.includes('.'))
      newValue = newValue.replace(/^([^.]*\.)|\./g, '$1');

    if (minValue && Math.sign(minValue) !== -1)
      newValue = newValue.replace(/-/g, '');

    if (maxValue && parseFloat(newValue) > maxValue) return;

    if (parseFloat(newValue) && !newValue.endsWith('.'))
      handleChange(parseFloat(newValue));
    else handleChange(newValue);
  };

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      <div
        className={`flex gap-2 p-2.5 w-full h-12 rounded-lg border bg-secondary-50 border-secondary-300 text-secondary-900 dark:bg-secondary-700 dark:border-secondary-600 dark:placeholder-secondary-400 dark:text-white ${
          focus
            ? 'outline-none ring-2 ring-blue-600 border-blue-600 dark:ring-blue-500 dark:border-blue-500'
            : ''
        } ${!disabled ? 'cursor-text' : ''}`}
        onClick={() => domRef.current?.focus()}
      >
        {prefix && <span>{prefix}</span>}
        <input
          className="w-full text-right text-sm bg-transparent focus:outline-none"
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
