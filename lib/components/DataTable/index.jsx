import PropTypes from 'prop-types';
import { FaFilePdf, FaPlus } from 'react-icons/fa6';
import { IoIosSearch } from 'react-icons/io';
import { Card } from '../Card';
import { Pagination } from '../Pagination';
import { Button } from '../Button';
import { Table } from '../Table';
import { Filter } from './Filter';

export const DataTable = props => {
  const {
    title,
    structure,
    data,
    pagination,
    filter,
    setPage,
    setSearch,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleExport,
    handleFeature,
    noSequentialNumber,
    dndFunc
  } = props;

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold dark:text-white">{title}</h1>
        <div className="flex gap-2">
          {handleCreate && (
            <Button onClick={handleCreate}>
              <FaPlus size={18} />
              <span className="hidden md:inline-block">Agregar</span>
            </Button>
          )}
          {handleExport && (
            <Button color="DarkSwitch" onClick={handleExport}>
              <FaFilePdf size={18} />
              <span className="hidden md:inline-block">Exportar</span>
            </Button>
          )}
        </div>
      </div>
      <Card>
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
            <Filter />
          </div>
        </div>
        <Table
          className="h-[calc(100vh_-_15rem)]"
          structure={structure}
          data={data}
          page={filter.page.number}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          handleExport={handleExport}
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
      </Card>
    </>
  );
};

DataTable.propTypes = {
  title: PropTypes.string,
  structure: PropTypes.array,
  data: PropTypes.array,
  pagination: PropTypes.object,
  filter: PropTypes.object,
  setPage: PropTypes.func,
  setSearch: PropTypes.func,
  handleCreate: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  handleExport: PropTypes.func,
  handleFeature: PropTypes.func,
  noSequentialNumber: PropTypes.bool,
  dndFunc: PropTypes.func
};
