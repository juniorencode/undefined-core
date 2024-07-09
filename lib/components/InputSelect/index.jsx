import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { cn } from '../../utils/styles';
import { useClickOutside } from '../../hooks/useClickOutside.hook';
import { InputContainer } from '../InputContainer';
import { SelectDropdown } from '../SelectDropdown';

export const InputSelect = props => {
  const {
    className,
    name,
    label,
    options = [],
    firstValue,
    callback,
    funcDelete,
    toNumber,
    toBoolean,
    register,
    required,
    ...params
  } = props;

  const domRef = useClickOutside(() => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(false);
  const output = toNumber ? 'NUMBER' : toBoolean ? 'BOOLEAN' : 'STRING';
  const {
    errors,
    value: initialValue,
    handleChange
  } = register(name, { required }, output);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!firstValue || options.length < 1) return;
    if (value === options[0].value) return;
    handleChange(options[0].value);
    setValue(options[0].value);
    // eslint-disable-next-line
  }, [options]);

  const onChange = e => {
    callback && callback(e.target.value);
    handleChange(e.target.value);
  };

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <InputContainer
      className={className}
      label={label}
      name={name}
      error={errors[name]?.message}
    >
      <div className="relative" ref={domRef}>
        <button
          className={cn(
            'flex items-center justify-between p-2.5 w-full h-12 text-sm text-center border focus:ring-4 focus:ring-opacity-30 focus:dark:ring-opacity-40 rounded-lg outline-none transition-all bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-white dark:placeholder-secondary-400 border-secondary-300 dark:border-secondary-600 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-primary-600 dark:focus:ring-primary-500',
            {
              'ring-4 ring-opacity-30 dark:ring-opacity-40 border-primary-500 dark:border-primary-500 ring-primary-600 dark:ring-primary-500':
                isOpen
            }
          )}
          type="button"
          onClick={handleClick}
          {...params}
        >
          <div className="flex items-center justify-start pr-4 w-full h-full">
            {options?.filter(item => item.value === value)[0]?.label || ''}
          </div>
          <IoIosArrowDown
            className={cn(
              'transition-transform duration-200 text-neutral-500 dark:text-neutral-400',
              {
                'text-primary-500 dark:text-primary-500 rotate-180': isOpen
              }
            )}
            size={16}
          />
        </button>
        <SelectDropdown
          domRef={domRef}
          name={name}
          value={value}
          isOpen={isOpen}
          options={options}
          onChange={onChange}
          setIsOpen={setIsOpen}
          funcDelete={funcDelete}
        />
      </div>
    </InputContainer>
  );
};

InputSelect.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
      ]).isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  firstValue: PropTypes.bool,
  callback: PropTypes.func,
  funcDelete: PropTypes.func,
  toNumber: PropTypes.bool,
  toBoolean: PropTypes.bool,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool
};
