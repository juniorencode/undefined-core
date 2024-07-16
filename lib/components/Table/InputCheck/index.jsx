import PropTypes from 'prop-types';
import { useId } from 'react';
import { cn } from '../../../utilities/styles.utilities';

export const InputCheck = props => {
  const { className, name, label, value, handleChange, ...params } = props;

  const domId = useId();

  return (
    <div className={cn('flex items-center w-fit cursor-pointer', className)}>
      <input
        className="w-6 h-6 border focus:ring-4 focus:ring-opacity-30 checked:focus:ring-opacity-30 focus:dark:ring-opacity-40 checked:focus:dark:ring-opacity-40 rounded cursor-pointer transition-all bg-secondary-200 dark:bg-secondary-700 checked:bg-primary-600 checked:dark:bg-primary-600 border-secondary-300 dark:border-secondary-600 focus:border-primary-500 focus:dark:border-primary-500 checked:border-primary-600 checked:dark:border-primary-600 checked:focus:border-primary-500 checked:focus:dark:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-500"
        id={domId}
        name={name}
        type="checkbox"
        checked={value}
        onChange={handleChange}
        {...params}
      />
      {label && (
        <label
          className="ml-2 px-2 text-sm font-medium cursor-pointer text-neutral-900 dark:text-neutral-300"
          htmlFor={domId}
        >
          {label}
        </label>
      )}
    </div>
  );
};

InputCheck.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.bool,
  handleChange: PropTypes.func
};
