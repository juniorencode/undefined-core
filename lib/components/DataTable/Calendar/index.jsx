import PropTypes from 'prop-types';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { cn } from '../../../utilities/styles.utilities';
import {
  changeMonth,
  getDate,
  nameOfMonths,
  shortNameOfWeekdays,
  setDay
} from '../../../utilities/time.utilities';

export const Calendar = ({
  toggleCalendar,
  setToggleCalendar,
  iniDate,
  endDate,
  setIniDate,
  setEndDate,
  iniDateHover,
  endDateHover,
  setIniDateHover,
  setEndDateHover,
  thisDate,
  setThisDate,
  otherDate = new Date()
}) => {
  const thisYear = new Date(thisDate).getFullYear();
  const thisMonth = new Date(thisDate).getMonth();
  const monthName = nameOfMonths[thisMonth];
  const daysOfMonth = new Date(thisYear, thisMonth + 1, 0).getDate();
  const startsOn = new Date(thisYear, thisMonth, 1).getDay();

  const days = Array.from({ length: daysOfMonth }, (_, idx) => idx + 1);

  const handleSelectDate = day => {
    const selectedDate = setDay(thisDate, day);
    if (
      endDate &&
      toggleCalendar === 'left' &&
      new Date(endDate) < new Date(selectedDate)
    ) {
      setToggleCalendar('right');
      setEndDate(selectedDate);
    } else if (
      toggleCalendar === 'left' ||
      new Date(iniDate) > new Date(selectedDate)
    ) {
      setToggleCalendar('right');
      setIniDate(selectedDate);
    } else {
      setToggleCalendar('');
      setEndDate(selectedDate);
      setIniDateHover('');
      setEndDateHover('');
    }
  };

  const handleBackMonth = () => {
    const _thisDate = new Date(thisDate);
    if (
      _thisDate < new Date(otherDate) ||
      new Date(changeMonth(otherDate, 1)) < _thisDate
    ) {
      setThisDate(changeMonth(thisDate, -1));
    }
  };

  const handleNextMonth = () => {
    const _thisDate = new Date(thisDate);
    if (
      _thisDate > new Date(otherDate) ||
      new Date(changeMonth(otherDate, -1)) > _thisDate
    ) {
      setThisDate(changeMonth(thisDate, 1));
    }
  };

  const handleHoverDate = day => {
    const hoverDate = setDay(thisDate, day);
    if (iniDate) {
      if (toggleCalendar === 'left') {
        setIniDateHover(hoverDate);
      } else if (toggleCalendar === 'right') {
        setEndDateHover(hoverDate);
      }
    }
  };

  const handleLeaveDate = () => {
    setIniDateHover('');
    setEndDateHover('');
  };

  const renderDays = () => {
    const emptyDays = Array.from(
      { length: startsOn % 7 === 0 ? 6 : startsOn - 1 },
      (_, i) => <li key={`empty-${i}`}></li>
    );

    const dateCells = days.map((day, i) => {
      const dayString = setDay(thisDate, day);
      const _dayDate = new Date(dayString);
      const _iniDate = new Date(iniDate);
      const _endDate = new Date(endDate);
      const _iniDateHover = new Date(iniDateHover);
      const _endDateHover = new Date(endDateHover);
      const _dayFormat = getDate(dayString);

      const isIniDate = iniDate && getDate(iniDate) === _dayFormat;
      const isEndDate = endDate && getDate(endDate) === _dayFormat;
      const isInRange =
        iniDate && endDate && _iniDate <= _dayDate && _endDate >= _dayDate;

      const isLeftDateHover =
        (iniDateHover &&
          getDate(iniDateHover) === _dayFormat &&
          _iniDateHover <= _endDate) ||
        (endDateHover &&
          getDate(endDateHover) === _dayFormat &&
          _endDateHover <= _iniDate);
      const isRightDateHover =
        (iniDateHover &&
          getDate(iniDateHover) === _dayFormat &&
          _iniDateHover >= _endDate) ||
        (endDateHover &&
          getDate(endDateHover) === _dayFormat &&
          _endDateHover >= _iniDate);

      const isHoverInRangeLeft =
        iniDate &&
        iniDateHover &&
        toggleCalendar === 'left' &&
        _iniDate <= _dayDate &&
        _iniDateHover > _dayDate &&
        _iniDate <= _iniDateHover &&
        _endDate >= _iniDateHover;
      const isHoverInRangeRight =
        endDate &&
        endDateHover &&
        toggleCalendar === 'right' &&
        _endDate >= _dayDate &&
        _endDateHover < _dayDate &&
        _iniDate <= _endDateHover &&
        _endDate >= _endDateHover;

      const isBorderDashed =
        iniDate && endDate
          ? ((_iniDateHover <= _dayDate || _endDateHover <= _dayDate) &&
              _iniDate > _dayDate) ||
            ((_iniDateHover >= _dayDate || _endDateHover >= _dayDate) &&
              _endDate < _dayDate)
          : (toggleCalendar === 'left' &&
              _iniDateHover <= _dayDate &&
              _endDate >= _dayDate) ||
            (toggleCalendar === 'right' &&
              _iniDate <= _dayDate &&
              _endDateHover >= _dayDate);

      const classNames = cn(
        'group flex items-center justify-center w-8 h-8 text-sm cursor-pointer text-secondary-200 transition-[background]',
        {
          'bg-primary-600': isIniDate || isEndDate || isInRange,
          'bg-opacity-40 bg-primary-700':
            isHoverInRangeLeft || isHoverInRangeRight,
          'rounded-l-full':
            isIniDate ||
            isLeftDateHover ||
            i === 0 ||
            (i + startsOn - 1) % 7 === 0,
          'rounded-r-full':
            isEndDate ||
            isRightDateHover ||
            i === daysOfMonth - 1 ||
            (i + startsOn) % 7 === 0,
          'border-t border-b border-dashed border-gray-400': isBorderDashed
        }
      );

      return (
        <li
          key={day}
          className={classNames}
          onClick={() => handleSelectDate(day)}
          onMouseEnter={() => handleHoverDate(day)}
          onMouseLeave={handleLeaveDate}
        >
          <span className="flex items-center justify-center w-8 h-8 dark:group-hover:bg-opacity-20 rounded-full pointer-events-none transition-all dark:group-hover:bg-primary-400">
            {day}
          </span>
        </li>
      );
    });

    return [...emptyDays, ...dateCells];
  };

  return (
    <div className="p-2 flex flex-col">
      <div className="flex justify-between mb-2">
        <button
          className={cn(
            'p-2.5 text-lg dark:focus:ring-opacity-40 rounded-lg outline-none text-secondary-500 dark:text-white hover:text-secondary-900 dark:hover:text-white bg-transparent dark:bg-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-600',
            {
              'cursor-default opacity-20': !(
                new Date(thisDate) < new Date(otherDate) ||
                new Date(changeMonth(otherDate, 1)) < new Date(thisDate)
              )
            }
          )}
          type="button"
          onClick={handleBackMonth}
        >
          <IoIosArrowBack />
        </button>
        <span className="px-5 py-2.5 text-sm font-semibold rounded-lg text-secondary-900 dark:text-white bg-transparent dark:bg-secondary-700">
          {monthName} {thisYear}
        </span>
        <button
          className={cn(
            'p-2.5 text-lg dark:focus:ring-opacity-40 rounded-lg outline-none text-secondary-500 dark:text-white hover:text-secondary-900 dark:hover:text-white bg-transparent dark:bg-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-600',
            {
              'cursor-default opacity-20': !(
                new Date(thisDate) > new Date(otherDate) ||
                new Date(changeMonth(otherDate, -1)) > new Date(thisDate)
              )
            }
          )}
          type="button"
          onClick={handleNextMonth}
        >
          <IoIosArrowForward />
        </button>
      </div>
      <div className="p-1">
        <ul className="grid grid-cols-7 mb-1 w-56">
          {shortNameOfWeekdays.map(name => (
            <li
              key={name}
              className="text-center h-6 leading-6 text-sm font-medium select-none text-secondary-400 dark:text-secondary-400"
            >
              {name}
            </li>
          ))}
        </ul>
        <ul className="grid grid-cols-7 grid-rows-6 gap-y-1 w-56">
          {renderDays()}
        </ul>
      </div>
    </div>
  );
};

Calendar.propTypes = {
  toggleCalendar: PropTypes.string.isRequired,
  setToggleCalendar: PropTypes.func.isRequired,
  iniDate: PropTypes.string,
  endDate: PropTypes.string,
  setIniDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  iniDateHover: PropTypes.string,
  endDateHover: PropTypes.string,
  setIniDateHover: PropTypes.func.isRequired,
  setEndDateHover: PropTypes.func.isRequired,
  thisDate: PropTypes.string,
  setThisDate: PropTypes.func.isRequired,
  otherDate: PropTypes.string
};
