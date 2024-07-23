import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Table } from '../Table';
import { cn } from '../../utilities/styles.utilities';
import { tile } from '../../utilities/config.utilities';
import { primaryColors } from '../../utilities/color.utilities';
import { mergeObjectDeep } from '../../utilities/utils.utilities';

ChartJS.register(ArcElement, Title, Tooltip, Legend, Filler);

export const TableBadge = ({
  className,
  title,
  structure,
  data,
  dataPie,
  options,
  noSeqNum,
  height = 1
}) => {
  const accentColor = primaryColors[localStorage.getItem('accent') || 'blue'];
  const defaultData = {
    datasets: [
      {
        borderWidth: 2,
        borderColor: `rgba(${accentColor['500']} / 1)`,
        backgroundColor: `rgba(${accentColor['500']} / 0.3)`,
        hoverBackgroundColor: `rgba(${accentColor['500']} / 0.5)`
      }
    ]
  };
  const defaultOptions = {
    maintainAspectRatio: true,
    responsive: true,
    animation: true
  };

  return (
    <div
      className={cn('p-4 rounded-lg bg-secondary-800', className)}
      style={{ height: tile * height + 16 * (height - 1) + 'px' }}
    >
      {title && (
        <p className="h-10 text-lg text-nowrap font-semibold truncate text-secondary-200">
          {title}
        </p>
      )}
      <div className="flex flex-col gap-4">
        {dataPie && (
          <div className="px-8 py-4">
            <Pie
              data={mergeObjectDeep(defaultData, dataPie)}
              options={mergeObjectDeep(defaultOptions, options)}
            />
          </div>
        )}
        <Table
          className="h-[calc(100%-40px)]"
          minHeight={50}
          structure={structure}
          data={data}
          noSeqNum={noSeqNum}
        />
      </div>
    </div>
  );
};

TableBadge.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  structure: PropTypes.array,
  data: PropTypes.array,
  dataPie: PropTypes.object,
  options: PropTypes.object,
  noSeqNum: PropTypes.bool,
  height: PropTypes.number
};
