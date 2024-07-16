import axios from 'axios';
import {
  useForm,
  DataFormLayout,
  FormSection,
  InputText,
  InputSearch,
  InputCheck,
  InputSelect,
  InputNumber,
  InputTextarea,
  InputPassword,
  InputSwitch,
  InputDate,
  InputRichText,
  InputColor,
  InputMedia,
  InputFile
} from '../../../lib/main';

export const FormPage = () => {
  const Form = useForm({
    // text: 'qwe',
    // search: '3',
    // password: 'qwe',
    // number: 123.12,
    // select: '1',
    // textarea: 'qwe',
    // checkbox: true,
    // switch: true,
    media: ['66969f8d25ecd64998abe515'],
    _media: [
      {
        _id: '66969f8d25ecd64998abe515',
        name: 'File 1-200x200.png',
        storage: '1721147277940-File 1-200x200.png',
        isPhoto: false,
        size: 27799,
        type: 'image/png',
        deleted: false,
        createdAt: '2024-07-16T16:27:57.954Z',
        updatedAt: '2024-07-16T16:27:57.954Z',
        url: 'https://backend.grupocotrina.club/public/1721147277940-File 1-200x200.png',
        id: '66969f8d25ecd64998abe515'
      }
    ]
  });
  // const Form = useForm();

  const breadcrumb = [
    {
      label: 'Item1',
      url: 'https://google.com/'
    },
    {
      label: 'Item2'
    }
  ];

  Form.registerSubmit(form => {
    console.log(form);
  });
  const postFile = (form, setProgress) =>
    axios
      .post('https://api.juniorencode.com/api/storage/file', form, {
        onUploadProgress: ({ progress, loaded, total }) => {
          if (setProgress) {
            total !== loaded &&
              setProgress(prev => ({ ...prev, progress, loaded, total }));
          }
        }
      })
      .then(res => res.data)
      .catch(err => err);
  const putFile = (id, form) =>
    axios
      .put('https://api.juniorencode.com/api/storage/file/' + id, form)
      .then(res => res.data)
      .catch(err => err);

  const removeFile = id =>
    axios
      .delete('https://api.juniorencode.com/api/storage/file/' + id)
      .then(res => res.data)
      .catch(err => err);

  return (
    <DataFormLayout breadcrumb={breadcrumb} title="Contabilidad" form={Form}>
      <form className="flex flex-col gap-2" onKeyDown={Form.handleAssistant}>
        <InputColor
          className="col-span-4"
          label="Color"
          name="color"
          register={Form.register}
        />
        <InputMedia
          label="Media"
          name="media"
          accept={['jpeg', 'jpg', 'png', 'webp', 'mp4']}
          register={Form.register}
          postFile={postFile}
          removeFile={removeFile}
        />
        <InputMedia
          label="Media"
          name="media1"
          accept={['jpeg', 'jpg', 'png', 'webp', 'mp4']}
          register={Form.register}
          postFile={postFile}
          removeFile={removeFile}
          multiple
        />
        <InputFile
          label="File"
          name="file"
          register={Form.register}
          accept={['jpeg', 'jpg', 'png', 'webp', 'mp4']}
          postFile={postFile}
          putFile={putFile}
          removeFile={removeFile}
          multiple
        />
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
          firstValue
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
            { value: 'a1', label: 'gato' },
            { value: 'a2', label: 'perro' },
            { value: 'a3', label: 'sol' },
            { value: 'a4', label: 'luna' },
            { value: 'a5', label: 'estrella' },
            { value: 'a6', label: 'mar' },
            { value: 'a7', label: 'montaña' },
            { value: 'a8', label: 'río' },
            { value: 'a9', label: 'mentalista' }
          ]}
          // multiple
          register={Form.register}
          funcDelete={id => console.log('delete: ' + id)}
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
    </DataFormLayout>
  );
};
