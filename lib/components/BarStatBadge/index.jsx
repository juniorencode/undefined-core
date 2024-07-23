import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import {
  primaryColors,
  secondaryColors
} from '../../utilities/color.utilities';
import { cn } from '../../utilities/styles.utilities';
import { tile } from '../../utilities/config.utilities';
import { mergeObjectDeep } from '../../utilities/utils.utilities';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const BarStatBadge = ({
  className,
  title,
  data,
  options,
  height = 1
}) => {
  const accentColor = primaryColors[localStorage.getItem('accent') || 'blue'];
  const baseColor =
    secondaryColors[localStorage.getItem('base') || 'neutral']['400'];
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
    maintainAspectRatio: false,
    responsive: true,
    animation: true,
    scales: {
      x: {
        ticks: {
          color: `rgb(${baseColor})`
        }
      },
      y: { ticks: { color: `rgb(${baseColor})` } }
    }
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
      <div className="h-[calc(100%-40px)]">
        <Bar
          data={mergeObjectDeep(defaultData, data)}
          options={mergeObjectDeep(defaultOptions, options)}
        />
      </div>
    </div>
  );
};

BarStatBadge.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object,
  options: PropTypes.object,
  height: PropTypes.number
};
