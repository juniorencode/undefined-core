import { BrowserRouter } from 'react-router-dom';
import { useForm } from '../lib/hooks/useForm.hook';
import { Card } from '../lib/components/Card';
import { Button } from '../lib/components/Button';
import { FormSection } from '../lib/components/FormSection';
import { InputText } from '../lib/components/InputText';
import { InputSearch } from '../lib/components/InputSearch';
import { InputCheck } from '../lib/components/InputCheck';
import { InputSelect } from '../lib/components/InputSelect';
import { InputNumber } from '../lib/components/InputNumber';
import { InputTextarea } from '../lib/components/InputTextarea';
import { InputPassword } from '../lib/components/InputPassword';
import { InputSwitch } from '../lib/components/InputSwitch';

const App = () => {
  const Form = useForm();

  Form.registerSubmit(form => {
    console.log(form);
  });

  return (
    <BrowserRouter>
      <div className="absolute w-[100vw] min-h-[100vh] bg-secondary-100 dark:bg-secondary-900">
        <Card className="m-4 p-4">
          <form onSubmit={Form.handleSubmit}>
            <h1 className="text-4xl font-bold mb-8 text-neutral-800 dark:text-white">
              Test Inputs
            </h1>
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
              required
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
              required
            />
            <FormSection title="Section">
              <InputPassword
                className="col-span-12"
                name="password"
                label="Password"
                register={Form.register}
                required
              />
              <InputNumber
                className="col-span-12"
                name="number"
                label="Number"
                register={Form.register}
                required
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
                required
              />
              <InputTextarea
                className="col-span-12"
                name="textarea"
                label="Textarea"
                register={Form.register}
                required
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
            <Button className="w-full" type="submit">
              Send
            </Button>
          </form>
        </Card>
      </div>
    </BrowserRouter>
  );
};

export default App;
