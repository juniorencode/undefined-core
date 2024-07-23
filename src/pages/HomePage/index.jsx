import { FaUsers } from 'react-icons/fa6';
import { BaseLayout } from '../../../lib/layouts';
import { CountBadge } from './CountBadge';

import { BarStatBadge } from './BarStatBadge';

export const HomePage = () => {
  const values = [72, 56, 20, 36, 80, 40, 30, 20, 25, 30, 12, 60];
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  const options = {
    responsive: true,
    animation: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      // x: { ticks: { color: 'rgba(0, 220, 195)' } },
      y: { min: 0, max: 100 }
    }
  };

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Examples',
        data: values
        // backgroundColor: 'rgba(0, 220, 195, 0.5)'
      }
    ]
  };

  return (
    <BaseLayout className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <CountBadge
          title="Usuarios"
          count={12}
          to="https://juniorencode.com/"
          icon={<FaUsers size={24} />}
        />
        <CountBadge
          title="Usuarios"
          count={12}
          to="https://juniorencode.com/"
          icon={<FaUsers size={24} />}
        />
        <CountBadge
          title="Usuarios"
          count={12}
          to="https://juniorencode.com/"
          icon={<FaUsers size={24} />}
        />
      </div>
      <BarStatBadge data={data} options={options} />
    </BaseLayout>
  );
};
