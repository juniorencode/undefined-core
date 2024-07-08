import { useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { FaCalendar } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useClickOutside } from '../../hooks/useClickOutside.hook';
import { cn } from '../../utils/styles';
import { monthNames } from '../../utils/time';
import { InputContainer } from '../InputContainer';

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
    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    if (!today) return;
    handleChange(new Date());
    // eslint-disable-next-line
  }, [today]);

  const onChange = date => {
    handleChange(date.toISOString());
    setIsOpen(false);
  };

  const daysInMonth = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const formatDate = string => {
    if (!string) return;
    const date = new Date(string);
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const previousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(selectedDate);
    const firstDayOfWeek =
      selectedDate.getDay() % 7 === 0 ? 7 : selectedDate.getDay();

    for (let i = 1; i < firstDayOfWeek; i++) {
      days.push(<span key={`empty-${i}`} className="block"></span>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        i
      );
      days.push(
        <span
          key={i}
          className={cn(
            'block text-sm text-center font-semibold leading-9 rounded-lg cursor-pointer hover:bg-opacity-20 dark:hover:bg-opacity-20 select-none transition-all text-secondary-800 dark:text-secondary-200 hover:bg-primary-500 dark:hover:bg-primary-600',
            {
              'hover:bg-opacity-100 dark:hover:bg-opacity-100 text-white bg-primary-600 dark:bg-primary-600':
                daySelected === formatDate(date)
            }
          )}
          onClick={() => onChange(date)}
        >
          {i}
        </span>
      );
    }

    return days;
  };

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
            <div className="flex justify-between mb-2">
              <button
                className="p-2.5 text-lg focus:ring-4 focus:ring-opacity-40 dark:focus:ring-opacity-40 rounded-lg outline-none text-secondary-500 dark:text-white hover:text-secondary-900 dark:hover:text-white bg-white dark:bg-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-600 focus:ring-primary-600 dark:focus:ring-primary-500"
                type="button"
                onClick={previousMonth}
              >
                <IoIosArrowBack />
              </button>
              <span className="px-5 py-2.5 text-sm font-semibold rounded-lg text-secondary-900 dark:text-white bg-white dark:bg-secondary-700">
                {`${
                  monthNames[selectedDate.getMonth()]
                } ${selectedDate.getFullYear()}`}
              </span>
              <button
                className="p-2.5 text-lg focus:ring-4 focus:ring-opacity-40 dark:focus:ring-opacity-40 rounded-lg outline-none text-secondary-500 dark:text-white hover:text-secondary-900 dark:hover:text-white bg-white dark:bg-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-600 focus:ring-primary-600 dark:focus:ring-primary-500"
                type="button"
                onClick={nextMonth}
              >
                <IoIosArrowForward />
              </button>
            </div>
            <div className="p-1">
              <div>
                <div className="grid grid-cols-7 mb-1">
                  <span className="text-center h-6 leading-6 text-sm font-medium select-none text-secondary-400 dark:text-secondary-400">
                    Lu
                  </span>
                  <span className="text-center h-6 leading-6 text-sm font-medium select-none text-secondary-400 dark:text-secondary-400">
                    Ma
                  </span>
                  <span className="text-center h-6 leading-6 text-sm font-medium select-none text-secondary-400 dark:text-secondary-400">
                    Mi
                  </span>
                  <span className="text-center h-6 leading-6 text-sm font-medium select-none text-secondary-400 dark:text-secondary-400">
                    Ju
                  </span>
                  <span className="text-center h-6 leading-6 text-sm font-medium select-none text-secondary-400 dark:text-secondary-400">
                    Vi
                  </span>
                  <span className="text-center h-6 leading-6 text-sm font-medium select-none text-secondary-400 dark:text-secondary-400">
                    Sa
                  </span>
                  <span className="text-center h-6 leading-6 text-sm font-medium select-none text-secondary-400 dark:text-secondary-400">
                    Do
                  </span>
                </div>
                <div className="w-64 grid grid-cols-7 grid-rows-6">
                  {renderCalendar()}
                </div>
              </div>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse mt-2">
              <button
                className="px-5 py-2 w-1/2 text-sm text-center font-medium rounded-lg border focus:ring-4 focus:ring-opacity-30 dark:focus:ring-opacity-50 select-none transition-all text-white bg-primary-700 dark:bg-primary-600 hover:bg-primary-800 dark:hover:bg-primary-700 border-primary-600 dark:border-primary-600 hover:border-primary-500 dark:hover:border-primary-700 focus:ring-primary-600 dark:focus:ring-primary-700"
                type="button"
                onClick={() => onChange(new Date())}
              >
                Hoy
              </button>
              <button
                className="px-5 py-2 w-1/2 text-sm text-center font-medium rounded-lg border focus:ring-4 focus:ring-opacity-30 dark:focus:ring-opacity-50 select-none transition-all text-secondary-900 dark:text-white bg-white dark:bg-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-600 border-secondary-300 dark:border-secondary-600 focus:border-transparent dark:focus:border-transparent focus:ring-primary-600 dark:focus:ring-primary-700"
                type="button"
                onClick={() => {
                  handleChange('');
                  setIsOpen(false);
                }}
              >
                Limpiar
              </button>
            </div>
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
