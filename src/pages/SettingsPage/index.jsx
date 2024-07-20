import { SettingsLayout } from '../../../lib/main';

export const SettingsPage = () => {
  const breadcrumb = [
    {
      label: 'Configuraciones'
    }
  ];

  return <SettingsLayout breadcrumb={breadcrumb} />;
};
