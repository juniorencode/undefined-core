import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { cn } from '../../../utilities/styles.utilities';
import {
  getDate,
  changeMonth,
  formatDateCasualShort
} from '../../../utilities/time.utilities';
import { useClickOutside } from '../../../hooks/useClickOutside.hook';
import { Calendar } from '../Calendar';

export const DatePickerRange = ({
  iniDate,
  setIniDate,
  endDate,
  setEndDate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleCalendar, setToggleCalendar] = useState('');

  const domDatePickerRange = useClickOutside(() => {
    setIsOpen(false);
    setToggleCalendar('');
  });

  const [iniDateHover, setIniDateHover] = useState('');
  const [endDateHover, setEndDateHover] = useState('');

  const [leftCalendar, setLeftCalendar] = useState(changeMonth(getDate(), -1));
  const [rightCalendar, setRightCalendar] = useState(getDate());

  const openBox = side => {
    !isOpen && setIsOpen(true);
    setToggleCalendar(!iniDate ? 'left' : side);
  };

  useEffect(() => {
    !!endDate && setIsOpen(false);
  }, [endDate]);

  return (
    <div ref={domDatePickerRange} className="relative flex items-center">
      <ul className="flex items-center gap-1 px-4 text-sm text-secondary-400">
        <li>De</li>
        <li>
          <button
            className={cn(
              'flex items-center justify-center gap-2 py-0.5 w-[122px] font-medium border-2 rounded-lg text-secondary-400 dark:text-secondary-100 border-transparent hover:border-secondary-200 dark:hover:border-secondary-500',
              {
                'border-secondary-200 dark:border-secondary-500':
                  toggleCalendar === 'left',
                'text-primary-500 dark:text-primary-400 hover:border-secondary-200 dark:hover:border-secondary-500':
                  iniDate
              }
            )}
            onClick={() => openBox('left')}
          >
            <IoCalendarClearOutline />
            <span>
              {iniDate
                ? formatDateCasualShort(new Date(iniDate))
                : 'Fecha inicio'}
            </span>
          </button>
        </li>
        <li>al</li>
        <li>
          <button
            className={cn(
              'flex items-center justify-center gap-2 py-0.5 w-[122px] font-medium border-2 rounded-lg text-secondary-400 dark:text-secondary-100 border-transparent hover:border-secondary-200 dark:hover:border-secondary-500',
              {
                'border-secondary-200 dark:border-secondary-500':
                  toggleCalendar === 'right',
                'text-primary-500 dark:text-primary-400 hover:border-secondary-200 dark:hover:border-secondary-500':
                  endDate
              }
            )}
            onClick={() => openBox('right')}
          >
            <IoCalendarClearOutline />
            <span>
              {endDate
                ? formatDateCasualShort(new Date(endDate))
                : 'Fecha final'}
            </span>
          </button>
        </li>
      </ul>
      <div
        className={cn(
          'absolute top-full right-0 z-20 hidden mt-2 border rounded-lg shadow-bottom dark:shadow-black bg-secondary-50 dark:bg-secondary-700 border-secondary-300 dark:border-secondary-600',
          {
            flex: isOpen
          }
        )}
      >
        <div className="p-2">
          <Calendar
            toggleCalendar={toggleCalendar}
            setToggleCalendar={setToggleCalendar}
            iniDate={iniDate}
            endDate={endDate}
            setIniDate={setIniDate}
            setEndDate={setEndDate}
            iniDateHover={iniDateHover}
            endDateHover={endDateHover}
            setIniDateHover={setIniDateHover}
            setEndDateHover={setEndDateHover}
            thisDate={leftCalendar}
            setThisDate={setLeftCalendar}
            otherDate={rightCalendar}
          />
        </div>
        <div className="p-2 border-l border-secondary-300 dark:border-secondary-600">
          <Calendar
            toggleCalendar={toggleCalendar}
            setToggleCalendar={setToggleCalendar}
            iniDate={iniDate}
            endDate={endDate}
            setIniDate={setIniDate}
            setEndDate={setEndDate}
            iniDateHover={iniDateHover}
            endDateHover={endDateHover}
            setIniDateHover={setIniDateHover}
            setEndDateHover={setEndDateHover}
            thisDate={rightCalendar}
            setThisDate={setRightCalendar}
            otherDate={leftCalendar}
          />
        </div>
      </div>
    </div>
  );
};

DatePickerRange.propTypes = {
  iniDate: PropTypes.string,
  setIniDate: PropTypes.func,
  endDate: PropTypes.string,
  setEndDate: PropTypes.func
};
