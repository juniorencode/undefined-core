import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaBookOpen, FaHome, FaTable } from 'react-icons/fa';
import { cn } from '../../lib/utils/styles';
import { Navigation } from '../../lib/main';

export const BaseLayout = ({ children }) => {
  // const [isCollapse, setIsCollapse] = useState(
  //   localStorage.getItem('isCollapse') === 'true' || false
  // );
  const [isCollapse, setIsCollapse] = useState(true);

  useEffect(() => {
    localStorage.setItem('isCollapse', isCollapse);
  }, [isCollapse]);

  const options = [
    {
      label: 'Inicio',
      path: '/',
      icon: <FaHome size={16} />
    },
    {
      label: 'DataTable',
      path: '/table',
      icon: <FaTable size={16} />
    },
    {
      label: 'DataForm',
      path: '/form',
      icon: <FaBookOpen size={16} />
    }
  ];

  return (
    <div className="flex flex-col h-screen dark:bg-secondary-900">
      <div>
        <Navigation
          options={options}
          isCollapse={isCollapse}
          setIsCollapse={setIsCollapse}
        />
        <div
          className={cn('lg:ml-64 p-4 transition-all duration-300', {
            'lg:ml-[53px]': isCollapse
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};
