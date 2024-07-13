import { BaseLayout } from '../../layouts/BaseLayout';
import { useFilter, Breadcrumb, DataTable } from '../../../lib/main';
import Data from './data.json';

export const TablePage = () => {
  const { filter, setPage, setSearch } = useFilter();

  const structure = [
    {
      label: '',
      attr: 'important',
      type: 'important'
    },
    {
      label: 'thumbnail',
      attr: 'thumbnail',
      type: 'thumbnail'
    },
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

  // const data = [
  //   {
  //     id: '1',
  //     important: true,
  //     thumbnail: {
  //       _id: '6643d0d2940ffd4bde14ac4c',
  //       name: 'slice5.jpg',
  //       storage: '1715720402222-slice5.jpg',
  //       isPhoto: false,
  //       size: 307321,
  //       type: 'image/jpeg',
  //       parentFolder: '6643b9de5736f91413a9080f',
  //       deleted: false,
  //       createdAt: '2024-05-14T21:00:02.226Z',
  //       updatedAt: '2024-06-20T22:23:15.796Z',
  //       url: 'https://api.juniorencode.com/public/1715720402222-slice5.jpg',
  //       id: '6643d0d2940ffd4bde14ac4c'
  //     },
  //     idCard: {
  //       fullname: 'Radi',
  //       email: 'radi@radi.com',
  //       photo:
  //         'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //     },
  //     text: 'texto',
  //     textN: 'texto',
  //     tags: ['tag1', 'tag2', 'tag3'],
  //     photo:
  //       'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
  //     users: [
  //       {
  //         label: 'Fabián Alexis Consilla Martinez',
  //         photo:
  //           'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       },
  //       {
  //         label: 'Fabián Alexis Consilla Martinez',
  //         photo:
  //           'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       }
  //     ],
  //     link: {
  //       url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
  //       label: 'Link'
  //     },
  //     files: [
  //       {
  //         label: 'file1.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       },
  //       {
  //         label: 'file2.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       },
  //       {
  //         label: 'file3.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       }
  //     ],
  //     filesIcon: [
  //       {
  //         label: 'file1.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       },
  //       {
  //         label: 'file2.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       },
  //       {
  //         label: 'file3.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       }
  //     ],
  //     status: true,
  //     tag: { color: 'GREEN', label: 'StatusGREEN' },
  //     createdAt: new Date()
  //   },
  //   {
  //     id: '2',
  //     important: false,
  //     thumbnail: {
  //       _id: '6643d0e8940ffd4bde14ac66',
  //       name: 'slice3.mp4',
  //       storage: '1715720424204-slice3.mp4',
  //       isPhoto: false,
  //       size: 59666596,
  //       type: 'video/mp4',
  //       parentFolder: '6643b9de5736f91413a9080f',
  //       deleted: false,
  //       createdAt: '2024-05-14T21:00:24.417Z',
  //       updatedAt: '2024-06-30T04:21:42.609Z',
  //       url: 'https://api.juniorencode.com/public/1715720424204-slice3.mp4',
  //       id: '6643d0e8940ffd4bde14ac66'
  //     },
  //     idCard: {
  //       fullname: 'Radi2',
  //       email: 'radi@radi.com',
  //       photo:
  //         'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //     },
  //     text: 'texto',
  //     textN: 'texto',
  //     tags: ['tag1', 'tag2', 'tag3'],
  //     photo:
  //       'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
  //     users: [
  //       {
  //         label: 'Fabián Alexis Consilla Martinez',
  //         photo:
  //           'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       },
  //       {
  //         label: 'Fabián Alexis Consilla Martinez',
  //         photo:
  //           'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       }
  //     ],
  //     link: {
  //       url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
  //       label: 'Link'
  //     },
  //     files: [
  //       {
  //         label: 'file1.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       },
  //       {
  //         label: 'file2.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       },
  //       {
  //         label: 'file3.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       }
  //     ],
  //     filesIcon: [
  //       {
  //         label: 'file1.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       },
  //       {
  //         label: 'file2.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       },
  //       {
  //         label: 'file3.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       }
  //     ],
  //     status: false,
  //     tag: { color: 'RED', label: 'StatusRED' },
  //     createdAt: new Date()
  //   },
  //   {
  //     id: '3',
  //     important: false,
  //     thumbnail: {
  //       _id: '6643d0d2940ffd4bde14ac4c',
  //       name: 'slice5.jpg',
  //       storage: '1715720402222-slice5.jpg',
  //       isPhoto: false,
  //       size: 307321,
  //       type: 'image/jpeg',
  //       parentFolder: '6643b9de5736f91413a9080f',
  //       deleted: false,
  //       createdAt: '2024-05-14T21:00:02.226Z',
  //       updatedAt: '2024-06-20T22:23:15.796Z',
  //       url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
  //       id: '6643d0d2940ffd4bde14ac4c'
  //     },
  //     idCard: {
  //       fullname: 'Radi3',
  //       email: 'radi@radi.com',
  //       photo:
  //         'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //     },
  //     text: 'texto',
  //     textN: 'texto',
  //     tags: ['tag1', 'tag2', 'tag3'],
  //     photo:
  //       'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
  //     users: [
  //       {
  //         label: 'Fabián Alexis Consilla Martinez',
  //         photo:
  //           'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       },
  //       {
  //         label: 'Fabián Alexis Consilla Martinez',
  //         photo:
  //           'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       }
  //     ],
  //     link: {
  //       url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
  //       label: 'Link'
  //     },
  //     files: [
  //       {
  //         label: 'file1.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       },
  //       {
  //         label: 'file2.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       },
  //       {
  //         label: 'file3.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       }
  //     ],
  //     filesIcon: [
  //       {
  //         label: 'file1.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       },
  //       {
  //         label: 'file2.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       },
  //       {
  //         label: 'file3.webp',
  //         url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
  //       }
  //     ],
  //     status: true,
  //     tag: { color: '', label: 'Status' },
  //     createdAt: new Date()
  //   }
  // ];

  return (
    <BaseLayout>
      <div className="mb-2">
        <Breadcrumb
          options={[
            {
              label: 'Item1',
              url: 'https://google.com/'
            },
            {
              label: 'Item2'
            }
          ]}
        />
      </div>
      <DataTable
        title="Contabilidad"
        structure={structure}
        data={Data.data}
        filter={filter}
        pagination={{
          currentPage: 1,
          limit: 50,
          from: 1,
          to: 8,
          total: 15000,
          totalPages: 1
        }}
        setPage={setPage}
        setSearch={setSearch}
        handleCreate={() => console.log('cr')}
        handleUpdate={() => console.log('up')}
        handleDelete={() => console.log('de')}
        handleExport={() => console.log('ex')}
        handleFeature={() => console.log('fe')}
        dndFunc={() => console.log('dnd')}
      />
    </BaseLayout>
  );
};
