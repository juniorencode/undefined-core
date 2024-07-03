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

const App = () => {
  const Form = useForm({ isEnabled: true });

  return (
    <BrowserRouter>
      <Card className="m-4 p-4">
        <form onSubmit={Form.handleSubmit}>
          <h1 className="text-4xl font-bold mb-12 text-white">Test Inputs</h1>
          <InputText
            name="email"
            label="Text"
            register={Form.register}
            required
          />
          <InputPassword
            name="password"
            label="Password"
            register={Form.register}
          />
          <InputNumber name="number" label="Number" register={Form.register} />
          <InputSelect
            name="select"
            label="Select"
            options={[
              { label: '1', value: '20' },
              { label: '2', value: '30' },
              { label: '3', value: '40' },
              { label: '4', value: '50' },
              { label: '5', value: '60' },
              { label: '6', value: '70' }
            ]}
            register={Form.register}
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
          <Button className="w-full" type="submit">
            Send
          </Button>
        </form>
      </Card>
    </BrowserRouter>
  );
};

export default App;
