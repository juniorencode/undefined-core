import PropTypes from 'prop-types';
import { cn } from '../../utilities/styles.utilities';
import { tile } from '../../utilities/config.utilities';
import { Table } from '../Table';

export const TableBadge = ({
  className,
  title,
  structure,
  data,
  noSeqNum,
  height = 1
}) => {
  return (
    <div
      className={cn('p-4 rounded-lg bg-secondary-800', className)}
      style={{ height: tile * height + 16 * (height - 1) + 'px' }}
    >
      {title && (
        <p className="h-10 text-lg text-nowrap font-semibold truncate text-secondary-200">
          {title}
        </p>
      )}
      <div className="flex flex-col gap-4">
        <Table
          className="h-[calc(100%-40px)]"
          minHeight={50}
          structure={structure}
          data={data}
          noSeqNum={noSeqNum}
        />
      </div>
    </div>
  );
};

TableBadge.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  structure: PropTypes.array,
  data: PropTypes.array,
  dataPie: PropTypes.object,
  options: PropTypes.object,
  noSeqNum: PropTypes.bool,
  height: PropTypes.number
};
