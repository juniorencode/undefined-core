import PropTypes from 'prop-types';
import { GrRefresh } from 'react-icons/gr';
import { DatePreset } from '../DatePreset';
import { DatePickerRange } from '../DatePickerRange';

export const Filter = ({ iniDate, endDate, setDate }) => {
  return (
    <div className="flex">
      {(iniDate || endDate) && (
        <button
          className="flex items-center justify-center w-[32px] h-[38px] text-white hover:text-primary-500"
          onClick={() => setDate('', '')}
        >
          <GrRefresh size={18} />
        </button>
      )}
      <div className="flex items-stretch h-[38px] border rounded-lg bg-secondary-700 border-secondary-600">
        <DatePreset iniDate={iniDate} endDate={endDate} setDate={setDate} />
        <DatePickerRange
          iniDate={iniDate}
          setIniDate={ini => setDate(ini, endDate)}
          endDate={endDate}
          setEndDate={end => setDate(iniDate, end)}
        />
      </div>
    </div>
  );
};

Filter.propTypes = {
  iniDate: PropTypes.string,
  endDate: PropTypes.string,
  setDate: PropTypes.func
};
