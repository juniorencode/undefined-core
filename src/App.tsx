// import { Button } from '../';
import { Card } from '../lib/components/Card';
import { InputCheck } from '../lib/components/InputCheck';
import { InputNumber } from '../lib/components/InputNumber';
import { InputPassword } from '../lib/components/InputPassword';
import { InputSelect } from '../lib/components/InputSelect';
import { InputText } from '../lib/components/InputText';
import { InputTextarea } from '../lib/components/InputTextarea';
import { useForm } from '../lib/utils/useForm.hook';

const App = () => {
  const Form = useForm({ isEnabled: true });
  return (
    <>
      <h1>Hello World..!!</h1>
      <Card>
        <InputCheck name="no" register={Form.register} />
        <InputNumber name="i1" register={Form.register} />
        <InputPassword name="i2" register={Form.register} />
        <InputText name="i3" register={Form.register} />
        <InputTextarea name="i4" register={Form.register} />
        <InputSelect
          options={[
            { label: '1', value: '20' },
            { label: '2', value: '30' }
          ]}
          name="i5"
          register={Form.register}
        />
      </Card>
    </>
  );
};

export default App;
