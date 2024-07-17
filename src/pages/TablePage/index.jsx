import { useEffect, useState } from 'react';
import { useFilter, DataTableLayout } from '../../../lib/main';
import Data from './data.json';

export const TablePage = () => {
  const [loading, setLoading] = useState(true);
  const { filter, setDate, setPage, setSearch } = useFilter({
    page: { size: 20 },
    search: 'Hello World..!!'
  });

  const breadcrumb = [
    {
      label: 'Item1',
      url: 'https://google.com/'
    },
    {
      label: 'Item2'
    }
  ];

  const structure = [
    {
      label: '',
      attr: 'featured',
      type: 'featured'
    },
    {
      label: 'thumbnail',
      attr: 'thumbnail',
      type: 'thumbnail'
    },
    { attr: 'line' },
    {
      label: 'idCard',
      attr: 'idCard',
      type: 'idCard'
    },
    {
      label: 'text',
      attr: 'text',
      type: 'text'
    },
    {
      label: 'textN',
      attr: 'textN',
      type: 'bold'
    },
    {
      label: 'tag',
      attr: 'tag',
      type: 'tag'
    },
    {
      label: 'tags',
      attr: 'tags',
      type: 'tags'
    },
    {
      label: 'link',
      attr: 'link',
      type: 'link'
    },
    {
      label: 'photo',
      attr: 'photo',
      type: 'photo'
    },
    {
      label: 'users',
      attr: 'users',
      type: 'users'
    },
    {
      label: 'files',
      attr: 'files',
      type: 'files'
    },
    {
      label: 'filesIcon',
      attr: 'filesIcon',
      type: 'filesIcon'
    },
    {
      label: 'Estado',
      attr: 'status',
      type: 'status'
    },
    {
      label: 'Fecha',
      attr: 'createdAt',
      type: 'date'
    }
  ];

  const pagination = {
    currentPage: 1,
    limit: 50,
    from: 1,
    to: 8,
    total: 15000,
    totalPages: 1
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <DataTableLayout
      breadcrumb={breadcrumb}
      title="Contabilidad"
      structure={structure}
      data={Data.data}
      loading={loading}
      filter={filter}
      pagination={pagination}
      setDate={setDate}
      setPage={setPage}
      setSearch={setSearch}
      handleCreate={() => console.log('cr')}
      handleUpdate={() => console.log('up')}
      handleDelete={() => console.log('de')}
      handleExport={() => console.log('ex')}
      handleFeature={() => console.log('fe')}
      dndFunc={() => console.log('dnd')}
    />
  );
};
