import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { cn } from '../utilities/styles.utilities';
import { navigation, handleLogout } from '../utilities/navigation.utilities';

export const DashboardLayout = ({ children, className }) => {
  const [isCollapse, setIsCollapse] = useState(
    localStorage.getItem('isCollapse') === 'true' || false
  );

  useEffect(() => {
    localStorage.setItem('isCollapse', isCollapse);
  }, [isCollapse]);

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto bg-secondary-100 dark:bg-secondary-900">
      <Navigation
        options={navigation}
        isCollapse={isCollapse}
        setIsCollapse={setIsCollapse}
        handleLogout={handleLogout}
      />
      <div
        className={cn(
          'mt-[62px] sm:mt-0 sm:ml-64 transition-all duration-300',
          {
            'sm:ml-[53px]': isCollapse
          },
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
