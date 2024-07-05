import { useEffect, useId, useRef, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { InputContainer } from '../InputContainer';

export const InputPassword = props => {
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
  const domRef = useRef(null);
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

  const onChange = e => handleChange(e.target.value);

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      <div className="relative">
        <input
          className="p-2.5 pr-12 w-full h-12 sm:text-sm border rounded-lg outline-none focus:ring-4 focus:ring-opacity-40 checked:focus:ring-opacity-40 focus:dark:ring-opacity-40 checked:focus:dark:ring-opacity-40 text-secondary-900 dark:text-white bg-secondary-50 dark:bg-secondary-700 dark:placeholder-secondary-400 border-secondary-300 dark:border-secondary-600 focus:ring-primary-600 dark:focus:ring-primary-500 focus:border-primary-600 dark:focus:border-primary-500"
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
