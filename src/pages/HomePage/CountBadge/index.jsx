import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const CountBadge = props => {
  const { title, count, to, icon } = props;

  return (
    <div className="flex items-center justify-between gap-2 p-4 rounded-lg text-secondary-100 bg-secondary-800">
      <div className="pl-2 border-l-4 border-primary-600">
        <p className="text-sm text-secondary-400">{title}</p>
        <span className="text-4xl">{count}</span>
      </div>
      <div className="p-2 rounded-lg bg-opacity-20 text-primary-500 bg-primary-500">
        <Link to={to}>{icon}</Link>
      </div>
    </div>
  );
};

CountBadge.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  to: PropTypes.string,
  icon: PropTypes.node
};
