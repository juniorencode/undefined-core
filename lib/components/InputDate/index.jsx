import { useEffect, useState, useCallback, useMemo } from 'react';
import { usePopper } from 'react-popper';
import { FaCalendar } from 'react-icons/fa';
import { useClickOutside } from '../../hooks/useClickOutside.hook';
import { cn } from '../../utils/styles';
import { monthNames } from '../../utils/time';
import { InputContainer } from '../InputContainer';
import { Calendar } from '../Calendar';

export const InputDate = ({
  className,
  label,
  name,
  today,
  register,
  required,
  ...params
}) => {
  const domRef = useClickOutside(() => setIsOpen(false));
  const [popperRef, setPopperRef] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daySelected, setDaySelected] = useState(null);
  const { errors, value, handleChange } = register(name, { required });

  const { styles, attributes } = usePopper(domRef.current, popperRef, {
    placement: isOpen ? 'bottom-start' : 'top-start'
  });

  useEffect(() => {
    setDaySelected(formatDate(value));
    value && setSelectedDate(new Date(value));
  }, [value]);

  useEffect(() => {
    if (today) handleChange(new Date());
  }, [today, handleChange]);

  const formatDate = useCallback(string => {
    if (!string) return;
    const date = new Date(string);
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }, []);

  const onChange = useCallback(
    date => {
      handleChange(date.toISOString());
      setIsOpen(false);
    },
    [handleChange]
  );

  const previousMonth = useCallback(() => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() - 1);
    setSelectedDate(newDate);
  }, [selectedDate]);

  const nextMonth = useCallback(() => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + 1);
    setSelectedDate(newDate);
  }, [selectedDate]);

  return (
    <InputContainer
      className={className}
      label={label}
      name={name}
      error={errors[name]?.message}
    >
      <div className="relative" ref={domRef}>
        {isOpen && (
          <div
            className={cn(
              'absolute top-full left-0 z-50 inline-block my-2 p-4 h-96 border rounded-lg shadow-box-top bg-white dark:bg-secondary-700 dark:border-neutral-600 dark:shadow-neutral-900',
              {
                'shadow-box-bottom':
                  !attributes.popper?.['data-popper-placement'].startsWith(
                    'top'
                  )
              }
            )}
            ref={setPopperRef}
            style={styles.popper}
            {...attributes.popper}
          >
            <Calendar
              selectedDate={selectedDate}
              daySelected={daySelected}
              formatDate={formatDate}
              onChange={onChange}
              previousMonth={previousMonth}
              nextMonth={nextMonth}
            />
          </div>
        )}
        <button
          className={cn(
            'flex items-center justify-between p-2.5 w-full h-12 text-sm text-center border focus:ring-4 focus:ring-opacity-30 dark:focus:ring-opacity-40 rounded-lg outline-none text-secondary-900 dark:text-white dark:placeholder-secondary-400 bg-secondary-50 dark:bg-secondary-700 border-secondary-300 dark:border-secondary-600 focus:border-primary-600 dark:focus:border-primary-500 focus:ring-primary-600 dark:focus:ring-primary-500',
            {
              'ring-4 ring-opacity-30 dark:ring-opacity-40 border-primary-600 dark:border-primary-500 ring-primary-600 dark:ring-primary-500':
                isOpen
            }
          )}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          {...params}
        >
          <FaCalendar />
          {formatDate(value)}
        </button>
      </div>
    </InputContainer>
  );
};
