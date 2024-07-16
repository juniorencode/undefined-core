import PropTypes from 'prop-types';
import { IoIosSearch } from 'react-icons/io';

export const Search = props => {
  const { search, setSearch } = props;

  return (
    <div className="relative w-60">
      <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none text-xl text-secondary-400">
        <IoIosSearch />
      </div>
      <input
        className="block p-2 pl-10 w-full text-sm outline-none rounded-lg text-secondary-900 bg-secondary-50 dark:bg-secondary-700 dark:placeholder-secondary-400 dark:text-white"
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={setSearch}
      />
    </div>
  );
};

Search.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func
};
