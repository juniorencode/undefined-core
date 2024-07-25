import { FaUsers } from 'react-icons/fa6';
import { BaseLayout } from '../../../lib/layouts';
import { CountBadge, TableBadge, Chart } from '../../../lib/main.js';

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

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Examples',
        data: values
      }
    ]
  };

  return (
    <BaseLayout className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-4">
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
        <CountBadge
          title="Usuarios"
          count={12}
          to="https://juniorencode.com/"
          icon={<FaUsers size={24} />}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Chart
          className="col-span-3"
          title="Transacciones del 2024"
          data={data}
          options={{
            type: 'bar',
            data: {
              labels: months,
              datasets: [
                {
                  data: values,
                  borderWidth: 2
                }
              ]
            }
          }}
          height={4}
        />
        <TableBadge
          className="col-span-1"
          title="Top de categorías mas usadas"
          structure={[
            {
              label: 'Top Canales',
              attr: 'name',
              type: 'text'
            },
            {
              label: 'Usuarios',
              attr: 'number',
              type: 'text'
            }
          ]}
          data={[
            {
              id: 1,
              name: 'Búsqueda Orgánica',
              number: 5649
            },
            {
              id: 2,
              name: 'Referencia',
              number: 4025
            },
            {
              id: 3,
              name: 'Directo',
              number: 3105
            },
            {
              id: 4,
              name: 'Sociales',
              number: 1251
            },
            {
              id: 5,
              name: 'Otros',
              number: 734
            }
          ]}
          height={4}
        />
      </div>
    </BaseLayout>
  );
};
