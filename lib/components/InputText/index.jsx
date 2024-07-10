import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '../../utils/styles';
import { useClickOutside } from '../../hooks/useClickOutside.hook';
import { InputContainer } from '../InputContainer';
import { SelectDropdown } from '../SelectDropdown';
import { IoMdClose } from 'react-icons/io';

export const InputText = props => {
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
    multiple = true,
    ...params
  } = props;

  const domId = useId();
  const domRef = useClickOutside(() => setIsOpen(false));
  const inputRef = useRef(null);
  const [focus, setFocus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const { errors, value, handleChange } = register(name, {
    required,
    minLength,
    maxLength,
    isEmail
  });
  const separators = [',', ';', '|'];

  useEffect(() => {
    if (inputRef.current) {
      focused && inputRef.current.focus();
      focused && inputRef.current.value && inputRef.current.select();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (multiple) setFilteredOptions(options);
    else filterOptions(value);
    // eslint-disable-next-line
  }, [value]);

  const filterOptions = value => {
    const string = normalizeString(value?.trim());
    if (!string) setFilteredOptions(options);
    if (!string || !options) return;
    const filtered = options.filter(option =>
      normalizeString(option).includes(string)
    );
    if (filtered.length === 1 && filtered[0] === string) setFilteredOptions([]);
    else setFilteredOptions(filtered);
  };

  const normalizeString = (str = '') => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .toLowerCase();
  };

  const onChange = e => {
    const _value = e.target.value;
    handleChange(uppercase ? _value.toUpperCase() : _value);
    filterOptions(value);
  };

  //multiple
  const handleInput = (e, isSelection) => {
    if (separators.includes(e.nativeEvent.key) || isSelection) {
      const regex = new RegExp(`[${separators.join('')}]+`, 'g');
      const tag = e.target.value?.replace(regex, '').trim();

      if (tag.length > 0) {
        if (value) {
          if (!value.includes(tag)) handleChange([...value, tag]);
        } else {
          handleChange([tag]);
        }
      }
      e.target.value = '';
      e.preventDefault();
    } else filterOptions(e.target.value);
    inputRef.current && inputRef.current.focus();
    setIsOpen(true);
  };

  const handlePaste = e => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');

    const tags = pastedData
      .split(new RegExp(`[${separators.join('')}]+`))
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    if (tags.length > 0) {
      const uniqueTags = value
        ? tags.filter(tag => !value.includes(tag))
        : tags;
      const updatedTags = value ? [...value, ...uniqueTags] : [...uniqueTags];
      handleChange(updatedTags);
    }

    e.preventDefault();
  };

  const handleBlur = e => {
    const tag = e.target.value?.trim();

    if (tag.length > 0 && isOpen) {
      const tags = value ? [...value, tag] : [tag];
      handleChange(tags);
    }

    e.target.value = '';
    setFocus(false);
  };

  const handleRemove = (e, elem) => {
    e.preventDefault();
    if (value?.includes(elem)) {
      const tags = value.filter(item => item !== elem);
      handleChange(tags);
    }
  };

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      <div className="relative" ref={domRef}>
        {!multiple ? (
          <div
            className={cn(
              'flex items-center w-full border rounded-lg overflow-hidden transition-all text-secondary-900 dark:text-white bg-secondary-50 dark:bg-secondary-700 border-secondary-300 dark:border-secondary-600 dark:placeholder-secondary-400',
              {
                'ring-4 ring-opacity-30 dark:ring-opacity-40 border-primary-500 dark:border-primary-500 ring-primary-600 dark:ring-primary-500':
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
              value={value !== undefined && value !== null ? value : ''}
              onChange={onChange}
              onClick={() => setIsOpen(true)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              autoComplete={autoComplete ? 'on' : 'off'}
              disabled={disabled}
              {...params}
            />
            {postfix && <span className="mr-2.5">{postfix}</span>}
          </div>
        ) : (
          <div
            className={cn(
              'flex items-center w-full border rounded-lg overflow-hidden transition-all bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-white border-secondary-300 dark:border-secondary-600 dark:placeholder-secondary-400 p-2.5 min-h-12 sm:text-sm cursor-text',
              {
                'ring-4 ring-opacity-30 dark:ring-opacity-40 border-primary-500 dark:border-primary-500 ring-primary-600 dark:ring-primary-500':
                  focus || isOpen,
                'cursor-text': !disabled
              }
            )}
            onClick={() => {
              inputRef.current && inputRef.current.focus();
              setIsOpen(true);
            }}
          >
            <ul className="flex items-center flex-wrap gap-2 min-h-5">
              {value?.map(elem => (
                <li
                  key={elem}
                  className="flex items-center pl-2 pr-1.5 py-0.5 h-6 rounded border bg-secondary-200 border-secondary-300 dark:bg-secondary-500 dark:border-secondary-400"
                >
                  {elem}
                  <button
                    className="ml-1 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200"
                    type="button"
                    onClick={e => handleRemove(e, elem)}
                  >
                    <IoMdClose />
                  </button>
                </li>
              ))}
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
                onClick={() => setIsOpen(true)}
                onFocus={() => setFocus(true)}
                autoComplete={autoComplete ? 'on' : 'off'}
                disabled={disabled}
                onChange={handleInput}
                onPaste={handlePaste}
                onBlur={handleBlur}
                {...params}
              />
            </ul>
          </div>
        )}

        <SelectDropdown
          domRef={domRef}
          name={name}
          value={value}
          isOpen={isOpen}
          options={filteredOptions.map(option => ({
            value: option,
            label: option
          }))}
          onChange={e => {
            multiple ? handleInput(e, true) : onChange(e);
          }}
          setIsOpen={setIsOpen}
          funcDelete={funcDelete}
        />
      </div>
    </InputContainer>
  );
};
