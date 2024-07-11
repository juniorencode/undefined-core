import PropTypes from 'prop-types';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/styles';

export const Navigation = ({ options, isCollapse, setIsCollapse }) => {
  const [isHovering, setIsHovering] = useState(null);

  const handleShowHiden = e =>
    e.target === e.currentTarget && setIsCollapse(true);

  return (
    <div
      className={cn(
        'fixed top-0 left-0 z-20 w-screen lg:w-64 h-screen transition-none duration-0 lg:transition-[width] lg:duration-300 bg-opacity-50 dark:bg-opacity-90 bg-secondary-900',
        {
          'hidden lg:flex lg:w-16': isCollapse
        }
      )}
      onClick={handleShowHiden}
    >
      <aside
        className={cn(
          'w-64 lg:w-64 h-full transition-[width] duration-300 transform border-r bg-white border-secondary-200 dark:bg-secondary-800 dark:border-secondary-700',
          {
            'lg:w-16': isCollapse
          }
        )}
      >
        <div className="h-full mt-16 px-3 py-4">
          <ul className="space-y-2 text-xl">
            {options.map((menuItem, index) => (
              <li key={index}>
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      'flex items-center p-2 h-9 rounded-lg group text-secondary-900 dark:text-white hover:bg-secondary-100 dark:hover:bg-secondary-700',
                      {
                        'text-blue-500 dark:text-blue-400': isActive
                      }
                    )
                  }
                  to={menuItem.path}
                  onClick={() => setIsCollapse(true)}
                  onMouseEnter={() => setIsHovering(index)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <div className="static opacity-75">{menuItem.icon}</div>
                  <span
                    className={cn(
                      'text-base flex-1 ms-3 text-left rtl:text-right text-nowrap',
                      {
                        'lg:hidden': isCollapse,
                        'lg:block lg:ml-5 lg:px-3 lg:py-1 lg:rounded-lg lg:text-white lg:bg-black':
                          isHovering === index && isCollapse
                      }
                    )}
                  >
                    {menuItem.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

Navigation.propTypes = {
  options: PropTypes.array,
  isCollapse: PropTypes.bool,
  setIsCollapse: PropTypes.func
};
