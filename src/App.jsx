import { BrowserRouter } from 'react-router-dom';
import { Card } from '../lib/components/Card';
import { useForm } from '../lib/hooks/useForm.hook';
import { Button } from '../lib/components/Button';
import { InputText } from '../lib/components/InputText';
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
      <div className="absolute w-[100vw] h-[100vh] bg-secondary-100 dark:bg-secondary-900">
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
            <InputPassword
              name="password"
              label="Password"
              register={Form.register}
            />
            <InputNumber
              name="number"
              label="Number"
              register={Form.register}
            />
            <InputSelect
              name="select"
              label="Select"
              options={[
                { label: '1', value: '20' },
                { label: '2', value: '30' },
                { label: '3', value: '40' },
                { label: '4', value: '50' },
                { label: '5', value: '60' },
                { label: '6', value: '70' },
                { label: '7', value: '80' },
                { label: '8', value: '90' }
              ]}
              register={Form.register}
              funcDelete={id => console.log('delete: ' + id)}
            />
            <InputTextarea
              name="textarea"
              label="Textarea"
              register={Form.register}
            />
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
