import { useEffect, useId, useRef, useState } from 'react';
import { Register } from '../../types/global';
import { cn } from '../../utils/styles';
import { InputContainer } from '../InputContainer';

interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  name: string;
  prefix?: string;
  postfix?: string;
  register: Register;
  required?: boolean;
  minValue?: number;
  maxValue?: number;
  focused?: boolean;
  disabled?: boolean;
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
    focused,
    disabled,
    ...params
  } = props;
  const domId = useId();
  const domRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);
  const { errors, value, handleChange } = register(name, {
    required,
    minValue,
    maxValue
  });

  useEffect(() => {
    if (domRef.current) {
      focused && domRef.current.focus();
      focused && domRef.current.value && domRef.current.select();
    }
    // eslint-disable-next-line
  }, []);

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
        className={cn(
          'flex gap-2 p-2.5 w-full h-12 border rounded-lg bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-white border-secondary-300 dark:border-secondary-600 dark:placeholder-secondary-400',
          {
            'outline-none ring-2 ring-blue-600 dark:ring-blue-500 border-blue-600 dark:border-blue-500':
              focus,
            'cursor-text': !disabled
          }
        )}
        onClick={() => domRef.current?.focus()}
      >
        {prefix && <span>{prefix}</span>}
        <input
          className="w-full text-right text-sm focus:outline-none bg-transparent"
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
