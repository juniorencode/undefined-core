import { BrowserRouter } from 'react-router-dom';
import {
  useForm,
  Card,
  DataForm,
  FormSection,
  InputText,
  InputSearch,
  InputCheck,
  InputSelect,
  InputNumber,
  InputTextarea,
  InputPassword,
  InputSwitch,
  DataTable,
  InputDate,
  InputRichText,
  Breadcrumb
} from '../lib/main';
import { useFilter } from '../lib/hooks/useFilter.hook';
import { useEffect } from 'react';

const App = () => {
  // const Form = useForm({
  //   text: 'qwe',
  //   search: '3',
  //   password: 'qwe',
  //   number: 123.12,
  //   select: '1',
  //   textarea: 'qwe',
  //   checkbox: true,
  //   switch: true
  // });
  const Form = useForm();
  const { filter, setPage, setSearch } = useFilter();
  // useEffect(() => {
  //   Form.setForm({ text: ['hola', 'chau'] });
  // }, []);

  Form.registerSubmit(form => {
    console.log(form);
  });
  // https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp
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
      label: 'Estado',
      attr: 'status',
      type: 'status'
    },
    {
      label: 'by',
      attr: 'by',
      type: 'by'
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
      label: 'Fecha',
      attr: 'createdAt',
      type: 'date'
    }
  ];

  const data = [
    {
      id: '1',
      important: true,
      thumbnail: {
        _id: '6643d0d2940ffd4bde14ac4c',
        name: 'slice5.jpg',
        storage: '1715720402222-slice5.jpg',
        isPhoto: false,
        size: 307321,
        type: 'image/jpeg',
        parentFolder: '6643b9de5736f91413a9080f',
        deleted: false,
        createdAt: '2024-05-14T21:00:02.226Z',
        updatedAt: '2024-06-20T22:23:15.796Z',
        __v: 0,
        url: 'https://api.juniorencode.com/public/1715720402222-slice5.jpg',
        id: '6643d0d2940ffd4bde14ac4c'
      },
      idCard: {
        fullname: 'Radi',
        email: 'radi@radi.com',
        photo:
          'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
      },
      text: 'texto',
      textN: 'texto',
      tags: ['tag1', 'tag2', 'tag3'],
      photo:
        'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
      users: [
        {
          label: 'radi',
          photo:
            'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        },
        {
          label: 'radi2',
          photo:
            'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        }
      ],
      link: {
        url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
        label: 'Link'
      },
      by: {
        url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
        label: 'Link'
      },
      files: [
        {
          label: 'file1.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        },
        {
          label: 'file2.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        },
        {
          label: 'file3.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        }
      ],
      filesIcon: [
        {
          label: 'file1.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        },
        {
          label: 'file2.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        },
        {
          label: 'file3.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        }
      ],
      status: true,
      tag: { color: 'GREEN', label: 'StatusGREEN' },
      createdAt: new Date()
    },
    {
      id: '2',
      important: false,
      thumbnail: {
        _id: '6643d0e8940ffd4bde14ac66',
        name: 'slice3.mp4',
        storage: '1715720424204-slice3.mp4',
        isPhoto: false,
        size: 59666596,
        type: 'video/mp4',
        parentFolder: '6643b9de5736f91413a9080f',
        deleted: false,
        createdAt: '2024-05-14T21:00:24.417Z',
        updatedAt: '2024-06-30T04:21:42.609Z',
        __v: 0,
        url: 'https://api.juniorencode.com/public/1715720424204-slice3.mp4',
        id: '6643d0e8940ffd4bde14ac66'
      },
      idCard: {
        fullname: 'Radi2',
        email: 'radi@radi.com',
        photo:
          'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
      },
      text: 'texto',
      textN: 'texto',
      tags: ['tag1', 'tag2', 'tag3'],
      photo:
        'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
      users: [
        {
          label: 'radi',
          photo:
            'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        },
        {
          label: 'radi2',
          photo:
            'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        }
      ],
      link: {
        url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
        label: 'Link'
      },
      by: {
        url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
        label: 'Link'
      },
      files: [
        {
          label: 'file1.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        },
        {
          label: 'file2.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        },
        {
          label: 'file3.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        }
      ],
      filesIcon: [
        {
          label: 'file1.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        },
        {
          label: 'file2.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        },
        {
          label: 'file3.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        }
      ],
      status: false,
      tag: { color: 'RED', label: 'StatusRED' },
      createdAt: new Date()
    },
    {
      id: '3',
      important: false,
      thumbnail: {
        _id: '6643d0d2940ffd4bde14ac4c',
        name: 'slice5.jpg',
        storage: '1715720402222-slice5.jpg',
        isPhoto: false,
        size: 307321,
        type: 'image/jpeg',
        parentFolder: '6643b9de5736f91413a9080f',
        deleted: false,
        createdAt: '2024-05-14T21:00:02.226Z',
        updatedAt: '2024-06-20T22:23:15.796Z',
        __v: 0,
        url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
        id: '6643d0d2940ffd4bde14ac4c'
      },
      idCard: {
        fullname: 'Radi3',
        email: 'radi@radi.com',
        photo:
          'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
      },
      text: 'texto',
      textN: 'texto',
      tags: ['tag1', 'tag2', 'tag3'],
      photo:
        'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
      users: [
        {
          label: 'radi',
          photo:
            'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        },
        {
          label: 'radi2',
          photo:
            'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        }
      ],
      link: {
        url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
        label: 'Link'
      },
      by: {
        url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp',
        label: 'Link'
      },
      files: [
        {
          label: 'file1.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        },
        {
          label: 'file2.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        },
        {
          label: 'file3.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        }
      ],
      filesIcon: [
        {
          label: 'file1.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        },
        {
          label: 'file2.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        },
        {
          label: 'file3.webp',
          url: 'https://api.juniorencode.com/public/1720227595407-ima3ge-500x500.webp'
        }
      ],
      status: true,
      tag: { color: '', label: 'Status' },
      createdAt: new Date()
    }
  ];

  return (
    <BrowserRouter>
      <div className="absolute w-[100vw] min-h-[100vh] bg-secondary-100 dark:bg-secondary-900">
        <div className="h-[60px]"></div>

        <Card className="m-4">
          <h1 className="text-4xl font-bold p-4 text-neutral-800 dark:text-white">
            Test Inputs
          </h1>
          <div className="px-4">
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
          <DataForm form={Form}>
            <form
              className="flex flex-col gap-2"
              onKeyDown={Form.handleAssistant}
            >
              <InputSelect
                className="col-span-12"
                name="select"
                label="Select"
                options={[
                  { value: '1', label: 'gato' },
                  { value: '2', label: 'perro' },
                  { value: '3', label: 'sol' },
                  { value: '4', label: 'luna' },
                  { value: '5', label: 'estrella' },
                  { value: '6', label: 'mar' },
                  { value: '7', label: 'montaña' },
                  { value: '8', label: 'río' },
                  { value: '9', label: 'mentalista' }
                ]}
                funcDelete={id => console.log('delete: ' + id)}
                register={Form.register}
                // required
              />
              <InputSearch
                name="search"
                label="Search"
                options={[
                  { value: '1', label: 'gato' },
                  { value: '2', label: 'perro' },
                  { value: '3', label: 'sol' },
                  { value: '4', label: 'luna' },
                  { value: '5', label: 'estrella' },
                  { value: '6', label: 'mar' },
                  { value: '7', label: 'montaña' },
                  { value: '8', label: 'río' },
                  { value: '9', label: 'mentalista' }
                ]}
                register={Form.register}
                // required
              />
              <InputText
                name="text"
                label="Text"
                options={[
                  'gato',
                  'perro',
                  'sol',
                  'luna',
                  'estrella',
                  'mar',
                  'montaña',
                  'río',
                  'mentalista'
                ]}
                register={Form.register}
                // required
              />
              <InputRichText
                name="richtext"
                label="RichText"
                register={Form.register}
              />
              <InputDate
                name="date"
                label="Date"
                register={Form.register}
                // required
              />
              <FormSection title="Section">
                <InputPassword
                  className="col-span-12"
                  name="password"
                  label="Password"
                  register={Form.register}
                  // required
                />
                <InputNumber
                  className="col-span-12"
                  name="number"
                  label="Number"
                  options={[30, 50, 120, 10, 460, 1720, 2, 600]}
                  register={Form.register}
                  // required
                />
              </FormSection>
              <FormSection title="Section" box>
                <InputTextarea
                  className="col-span-12"
                  name="textarea"
                  label="Textarea"
                  register={Form.register}
                  // required
                />
              </FormSection>
              <InputCheck
                name="checkbox"
                label="Checkbox"
                labelCheck="Active"
                register={Form.register}
              />
              <InputSwitch
                name="switch"
                label="Switch"
                labelCheck="Active"
                register={Form.register}
              />
            </form>
          </DataForm>
        </Card>
        <div className="m-4">
          <DataTable
            structure={structure}
            data={data}
            filter={filter}
            pagination={{
              currentPage: 1,
              limit: 50,
              from: 1,
              to: 8,
              total: 8,
              totalPages: 1
            }}
            setPage={setPage}
            setSearch={setSearch}
            handleCreate={() => console.log('cr')}
            handleUpdate={() => console.log('ed')}
            handleDelete={() => console.log('de')}
            handleFeature={() => console.log('fe')}
            dndFunc={() => console.log('dnd')}
          />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
