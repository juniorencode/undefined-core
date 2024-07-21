import PropTypes from 'prop-types';
import { Responsive } from './Responsive';
import { Default } from './Default';

export const Navigation = ({
  options,
  isCollapse,
  setIsCollapse,
  handleLogout
}) => {
  return (
    <>
      <Default
        options={options}
        isCollapse={isCollapse}
        setIsCollapse={setIsCollapse}
        handleLogout={handleLogout}
      />
      <Responsive
        options={options}
        isCollapse={isCollapse}
        setIsCollapse={setIsCollapse}
        handleLogout={handleLogout}
      />
    </>
  );
};

Navigation.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired
    })
  ),
  isCollapse: PropTypes.bool,
  setIsCollapse: PropTypes.func,
  handleLogout: PropTypes.func
};
