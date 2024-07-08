import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '../../utils/styles';
import { useClickOutside } from '../../hooks/useClickOutside.hook';
import { InputContainer } from '../InputContainer';
import { SelectDropdown } from '../SelectDropdown';

export const InputSearch = props => {
  const {
    className,
    name,
    label,
    options = [],
    uppercase,
    align,
    prefix,
    postfix,
    funcDelete,
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
  const domRef = useClickOutside(() => setIsOpen(false));
  const inputRef = useRef(null);
  const [search, setSearch] = useState('');
  const [focus, setFocus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const { errors, value, handleChange } = register(name, {
    required,
    minLength,
    maxLength,
    isEmail
  });

  useEffect(() => {
    if (inputRef.current) {
      focused && inputRef.current.focus();
      focused && inputRef.current.value && inputRef.current.select();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const string = normalizeString(search?.trim());
    if (!string) setFilteredOptions(options);
    if (!string || !options) return;
    const filtered = options.filter(option =>
      normalizeString(option.label).includes(string)
    );
    setFilteredOptions(filtered);
    // eslint-disable-next-line
  }, [search]);

  const normalizeString = (str = '') => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .toLowerCase();
  };

  const handleOpen = () => setIsOpen(true);

  const onChange = e => {
    const _value = e.target.value;
    setSearch(uppercase ? _value.toUpperCase() : _value);
  };

  const onSelectChange = e => handleChange(e.target.value);

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      <div className="relative" ref={domRef}>
        <div
          className={cn(
            'flex items-center w-full border rounded-lg overflow-hidden transition-all bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-white border-secondary-300 dark:border-secondary-600 dark:placeholder-secondary-400',
            {
              'ring-4 ring-opacity-30 checked:ring-opacity-30 dark:ring-opacity-40 checked:dark:ring-opacity-40 border-primary-500 dark:border-primary-500 ring-primary-600 dark:ring-primary-500':
                focus || isOpen,
              'cursor-text': !disabled
            }
          )}
          onClick={() => inputRef.current && inputRef.current.focus()}
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
            ref={inputRef}
            role="textbox"
            id={domId}
            type="text"
            name={name}
            value={
              value !== undefined && value !== null
                ? options.filter(option => option.value === value).length > 0
                  ? options.filter(option => option.value === value)[0].label
                  : value
                : search
            }
            onChange={onChange}
            onClick={handleOpen}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            autoComplete={autoComplete ? 'on' : 'off'}
            disabled={disabled}
            {...params}
          />
          {postfix && <span className="mr-2.5">{postfix}</span>}
        </div>
        <SelectDropdown
          domRef={domRef}
          name={name}
          value={value}
          isOpen={isOpen}
          options={filteredOptions}
          onChange={onSelectChange}
          setIsOpen={setIsOpen}
          funcDelete={funcDelete}
        />
      </div>
    </InputContainer>
  );
};
