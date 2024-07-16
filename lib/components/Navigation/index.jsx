import PropTypes from 'prop-types';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { cn } from '../../utilities/styles.utilities';

export const Navigation = ({ options, isCollapse, setIsCollapse }) => {
  const [isHovering, setIsHovering] = useState(null);

  const handleShowHiden = e =>
    e.target === e.currentTarget && setIsCollapse(true);

  return (
    <div
      className={cn(
        'fixed top-0 left-0 z-20 w-screen sm:w-64 h-screen transition-none duration-0 bg-opacity-50 dark:bg-opacity-90 bg-secondary-900',
        {
          'hidden sm:flex sm:w-[53px]': isCollapse
        }
      )}
      onClick={handleShowHiden}
    >
      <aside
        className={cn(
          'w-64 sm:w-64 h-full border-r transform bg-white dark:bg-secondary-800 border-secondary-200 dark:border-secondary-700',
          {
            'sm:w-[53px]': isCollapse
          }
        )}
      >
        <div className="px-2 py-4 h-full">
          <div className="flex items-center mb-2">
            <button
              className="rounded-lg text-secondary-900 dark:text-white hover:bg-secondary-100 dark:hover:bg-secondary-700"
              onClick={() => setIsCollapse(!isCollapse)}
            >
              <div className="flex items-center justify-center p-[7px]">
                <RxHamburgerMenu size={22} />
              </div>
            </button>
            <NavLink to="/">
              <span
                className={cn(
                  'p-2 text-xl text-nowrap font-semibold text-secondary-700 dark:text-white',
                  {
                    'sm:hidden': isCollapse
                  }
                )}
              >
                Grupo Cotrina
              </span>
            </NavLink>
          </div>
          <hr className="my-4 border-secondary-300 dark:border-secondary-600" />
          <ul className="flex flex-col gap-2 text-xl">
            {options.map((menuItem, index) => (
              <li key={index}>
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      'relative flex items-center gap-1 rounded-lg transition-all text-secondary-900 dark:text-white hover:bg-secondary-100 dark:hover:bg-secondary-700',
                      {
                        'text-primary-600 dark:text-primary-400': isActive
                      }
                    )
                  }
                  to={menuItem.path}
                  onClick={() => setIsCollapse(true)}
                  onMouseEnter={() => setIsHovering(index)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <div className="static p-[10px] opacity-60 dark:opacity-75">
                    {menuItem.icon}
                  </div>
                  <span
                    className={cn(
                      'text-sm text-left rtl:text-right text-nowrap',
                      {
                        'sm:absolute sm:hidden': isCollapse,
                        'sm:left-full sm:block sm:ml-2 sm:px-3 sm:py-1 sm:rounded-lg sm:text-white sm:bg-black':
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
