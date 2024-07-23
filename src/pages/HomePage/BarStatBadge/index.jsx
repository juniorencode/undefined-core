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
} from '../../../../lib/utilities/color.utilities';
import { mergeObjectDeep } from '../../../../lib/utilities/utils.utilities';

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

export const BarStatBadge = ({ data, options }) => {
  const accentColor =
    primaryColors[localStorage.getItem('accent') || 'blue']['500'];
  const baseColor =
    secondaryColors[localStorage.getItem('base') || 'neutral']['400'];
  const defaultData = {
    datasets: [
      {
        backgroundColor: `rgba(${accentColor} / 0.3)`
      }
    ]
  };
  const defaultOptions = {
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
    <div className="p-4 rounded-lg bg-secondary-800">
      <Bar
        data={mergeObjectDeep(defaultData, data)}
        options={mergeObjectDeep(defaultOptions, options)}
      />
    </div>
  );
};

BarStatBadge.propTypes = {
  data: PropTypes.object,
  options: PropTypes.object
};
