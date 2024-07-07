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
  InputSwitch
} from '../lib/main';

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

  Form.registerSubmit(form => {
    console.log(form);
  });

  return (
    <BrowserRouter>
      <div className="absolute w-[100vw] min-h-[100vh] bg-secondary-100 dark:bg-secondary-900">
        <div className="h-[55px]"></div>
        <Card className="m-4">
          <h1 className="text-4xl font-bold p-4 text-neutral-800 dark:text-white">
            Test Inputs
          </h1>
          <DataForm form={Form}>
            <form
              className="flex flex-col gap-2"
              onKeyDown={Form.handleAssistant}
            >
              <InputText
                name="text"
                label="Text"
                options={[
                  { value: 'gato' },
                  { value: 'perro' },
                  { value: 'sol' },
                  { value: 'luna' },
                  { value: 'estrella' },
                  { value: 'mar' },
                  { value: 'montaña' },
                  { value: 'río' },
                  { value: 'mentalista' }
                ]}
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
                  register={Form.register}
                  // required
                />
              </FormSection>
              <FormSection title="Section" box>
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
    </BrowserRouter>
  );
};

export default App;
