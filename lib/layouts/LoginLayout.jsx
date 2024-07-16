import PropTypes from 'prop-types';
import { InputText } from '../components/InputText';
import { InputPassword } from '../components/InputPassword';
import { Button } from '../components/Button';
import { InputCheck } from '../main';

export const LoginLayout = ({ form }) => {
  return (
    <section className="flex items-center min-h-[calc(100vh-8vh)]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full">
        <p className="flex items-center mb-6 text-2xl font-semibold text-secondary-900 dark:text-white">
          Cotrina Exports E.I.R.L.
        </p>
        <div className="w-full bg-white rounded-lg shadow-3xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-secondary-800 dark:border-secondary-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-secondary-900 md:text-2xl dark:text-white">
              Iniciar sesión en su cuenta
            </h1>
            <form
              className="space-y-2 md:space-y-4"
              onSubmit={form.handleSubmit}
            >
              <InputText
                label="Correo electrónico"
                name="email"
                placeholder="jhon.doe@example.com"
                register={form.register}
                required
                focused
                minLength={2}
                maxLength={80}
                isEmail
              />
              <InputPassword
                label="Contraseña"
                name="password"
                placeholder="••••••••"
                register={form.register}
                required
                minLength={2}
                maxLength={80}
              />
              <InputCheck
                name="remember"
                labelCheck="¿Recordar usuario?"
                register={form.register}
              />
              <Button className="w-full" type="submit" disabled={form.pending}>
                {form.pending ? 'Cargando...' : 'Iniciar sesión'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

LoginLayout.propTypes = {
  form: PropTypes.object,
  remember: PropTypes.bool,
  setRemember: PropTypes.func
};
