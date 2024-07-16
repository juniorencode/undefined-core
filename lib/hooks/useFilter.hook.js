import { useState } from 'react';
import { mergeObjectDeep } from '../utilities/utils.utilities';

const useFilter = (initialFilter = {}) => {
  const defaultFilter = {
    page: {
      number: 1,
      size: 50
    },
    sort: '-createdAt'
  };

  const combineFilter = mergeObjectDeep(defaultFilter, initialFilter);
  const [filter, setFilter] = useState(combineFilter);

  const setDate = (ini, end) => {
    setFilter({ ...filter, ini, end });
  };

  const setPage = page => {
    setFilter({ ...filter, page: { ...filter.page, number: page } });
  };

  const setSearch = search => {
    setFilter({ ...filter, search });
  };

  const setSort = sort => {
    setFilter({ ...filter, sort });
  };

  const setReset = () => {
    setFilter(combineFilter);
  };

  return { filter, setSort, setDate, setPage, setSearch, setReset, setFilter };
};

export { useFilter };
