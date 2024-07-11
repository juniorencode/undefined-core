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
  InputDate,
  InputRichText,
  Breadcrumb
} from '../../../lib/main';

export const FormPage = () => {
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

  Form.registerSubmit(form => {
    console.log(form);
  });

  return (
    <div className="m-4">
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
              multiple
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
    </div>
  );
};
