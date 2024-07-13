import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utilities/styles.utilities';
import { Navigation } from '../../lib/main';
import { navigation } from '../utilities/navigation.utilities';

export const BaseLayout = ({ children }) => {
  const [isCollapse, setIsCollapse] = useState(
    localStorage.getItem('isCollapse') === 'true' || false
  );

  useEffect(() => {
    localStorage.setItem('isCollapse', isCollapse);
  }, [isCollapse]);

  return (
    <div className="flex flex-col h-screen dark:bg-secondary-900">
      <div>
        <Navigation
          options={navigation}
          isCollapse={isCollapse}
          setIsCollapse={setIsCollapse}
        />
        <div
          className={cn('sm:ml-64 p-4 transition-all duration-300', {
            'sm:ml-[53px]': isCollapse
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
