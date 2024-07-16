import { BrowserRouter } from 'react-router-dom';
import { FaBookOpen, FaHome, FaTable } from 'react-icons/fa';
import { AppRoutes } from './routes/app.routes';
import { setNavigation } from '../lib/main';

setNavigation([
  {
    label: 'Inicio',
    path: '/',
    icon: <FaHome size={18} />
  },
  {
    label: 'DataTable',
    path: '/table',
    icon: <FaTable size={18} />
  },
  {
    label: 'DataForm',
    path: '/form',
    icon: <FaBookOpen size={18} />
  }
]);

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
