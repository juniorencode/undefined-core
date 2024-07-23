import PropTypes from 'prop-types';
import { Pagination } from '../Pagination';
import { Table } from '../Table';
import { Filter } from './Filter';
import { Search } from './Search';

export const DataTable = props => {
  const {
    structure,
    data,
    loading,
    pagination,
    filter,
    setDate,
    setPage,
    setSearch,
    dndFunc,
    handleUpdate,
    handleDelete,
    handleFeature,
    noSeqNum,
    manageColumns
  } = props;

  return (
    <>
      <div className="flex items-center justify-between gap-4 m-3 h-10">
        <Search search={filter.search} setSearch={setSearch} />
        <Filter
          startDate={filter.start}
          endDate={filter.end}
          setDate={setDate}
        />
      </div>
      <Table
        className="h-[calc(100vh_-_19.1rem)] sm:h-[calc(100vh_-_15.1rem)] border-t border-b border-secondary-200 dark:border-secondary-500"
        structure={structure}
        data={data}
        loading={loading}
        size={filter.page.size}
        page={filter.page.number}
        dndFunc={dndFunc}
        highlighted={filter.search}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleFeature={handleFeature}
        noSeqNum={noSeqNum}
        manageColumns={manageColumns}
      />
      <div className="flex items-center justify-center sm:justify-between m-3 h-10 dark:text-white">
        <p className="hidden sm:block text-sm text-secondary-400">{`${pagination.from} al ${pagination.to} de ${pagination.total}`}</p>
        <Pagination
          totalPages={Math.ceil(pagination.total / pagination.limit)}
          currentPage={filter.page.number}
          setCurrentPage={setPage}
        />
      </div>
    </>
  );
};

DataTable.propTypes = {
  structure: PropTypes.array,
  data: PropTypes.array,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  filter: PropTypes.object,
  setDate: PropTypes.func,
  setPage: PropTypes.func,
  setSearch: PropTypes.func,
  dndFunc: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  handleFeature: PropTypes.func,
  noSeqNum: PropTypes.bool,
  manageColumns: PropTypes.bool
};
