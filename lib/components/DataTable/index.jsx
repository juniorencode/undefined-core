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
    handleUpdate,
    handleDelete,
    handleFeature,
    noSequentialNumber,
    dndFunc
  } = props;

  return (
    <>
      <div className="flex flex-col gap-4 m-3 h-10">
        <div className="flex items-center justify-between gap-4">
          <Search search={filter.search} setSearch={setSearch} />
          <Filter iniDate={filter.ini} endDate={filter.end} setDate={setDate} />
        </div>
      </div>
      <Table
        className="h-[calc(100vh_-_15rem)]"
        structure={structure}
        data={data}
        loading={loading}
        size={filter.page.size}
        page={filter.page.number}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleFeature={handleFeature}
        highlighted={filter.search}
        noSequentialNumber={noSequentialNumber}
        dndFunc={dndFunc}
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
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  handleFeature: PropTypes.func,
  noSequentialNumber: PropTypes.bool,
  dndFunc: PropTypes.func
};
