import PropTypes from 'prop-types';
import { IoIosSearch } from 'react-icons/io';
import { Pagination } from '../Pagination';
import { Table } from '../Table';
import { Filter } from './Filter';

export const DataTable = props => {
  const {
    structure,
    data,
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
          <div className="relative w-full max-w-80">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none text-xl text-secondary-400">
              <IoIosSearch />
            </div>
            <input
              className="block p-2 pl-10 w-full text-sm outline-none border focus:border focus:ring-4 focus:ring-opacity-40 dark:focus:ring-opacity-40 rounded-lg text-secondary-900 border-secondary-300 bg-secondary-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-secondary-700 dark:border-secondary-600 dark:placeholder-secondary-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              type="text"
              placeholder="Buscar..."
              value={filter.search}
              onChange={setSearch}
            />
          </div>
          <Filter iniDate={filter.ini} endDate={filter.end} setDate={setDate} />
        </div>
      </div>
      <Table
        className="h-[calc(100vh_-_15rem)]"
        structure={structure}
        data={data}
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
