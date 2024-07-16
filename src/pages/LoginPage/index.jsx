import { LoginLayout, useForm } from '../../../lib/main';

export const LoginPage = () => {
  const FormLogin = useForm({
    email: localStorage.getItem('savedEmail') || '',
    password: '',
    remember: Boolean(localStorage.getItem('savedEmail'))
  });

  FormLogin.registerSubmit(async data => {
    console.log(data);
    if (data.remember) localStorage.setItem('savedEmail', data.email);
    else localStorage.removeItem('savedEmail');
  });

  return <LoginLayout form={FormLogin} />;
};
