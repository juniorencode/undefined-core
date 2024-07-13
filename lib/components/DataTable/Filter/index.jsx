import { useState } from 'react';
import { GrRefresh } from 'react-icons/gr';
import { convertDatetoEnd } from '../../../utilities/time.utilities';
import { DatePreset } from '../DatePreset';
import { DatePickerRange } from '../DatePickerRange';

export const Filter = () => {
  const [filter, setFilter] = useState({ ini: '', end: '' });

  const setIniDate = ini => setFilter({ ...filter, ini });

  const setEndDate = end =>
    setFilter({ ...filter, end: convertDatetoEnd(end) });

  const setDate = (ini, end) => setFilter({ ...filter, ini, end });

  return (
    <div className="flex">
      {(filter.ini || filter.end) && (
        <button
          className="flex items-center justify-center w-[32px] h-full text-white hover:text-primary-500"
          onClick={() => setDate('', '')}
        >
          <GrRefresh size={18} />
        </button>
      )}
      <div className="flex items-stretch h-[38px] border rounded-lg bg-secondary-700 border-secondary-600">
        <DatePreset
          iniDate={filter.ini}
          endDate={filter.end}
          setDate={setDate}
        />
        <DatePickerRange
          iniDate={filter.ini}
          setIniDate={setIniDate}
          endDate={filter.end}
          setEndDate={setEndDate}
        />
      </div>
    </div>
  );
};
