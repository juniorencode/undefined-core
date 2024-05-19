import { Card } from '../lib/components/Card';
import { InputCheck } from '../lib/components/InputCheck';
import { InputNumber } from '../lib/components/InputNumber';
import { InputPassword } from '../lib/components/InputPassword';
import { InputText } from '../lib/components/InputText';
import { InputSelect } from '../lib/components/InputSelect';
import { InputTextarea } from '../lib/components/InputTextarea';
import { useForm } from '../lib/hooks/useForm.hook';

const App = () => {
  const Form = useForm({ isEnabled: true });

  return (
    <>
      <Card className="m-4 p-4">
        <h1 className="text-4xl font-bold mb-12 text-white">Test Inputs</h1>
        <InputText name="text" label="Text" register={Form.register} />
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
            { label: '2', value: '30' }
          ]}
          register={Form.register}
        />
        <InputTextarea
          name="textarea"
          label="Textarea"
          register={Form.register}
        />
        <InputCheck name="checkbox" label="Checkbox" register={Form.register} />
      </Card>
    </>
  );
};

export default App;
