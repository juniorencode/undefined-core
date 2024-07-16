import { BrowserRouter } from 'react-router-dom';
import { FaBookOpen, FaHome, FaTable } from 'react-icons/fa';
import { AppRoutes } from './routes/app.routes';
import { setNavigation, setHandleLogout } from '../lib/main';

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

setHandleLogout(() => console.log('Logout!!'));

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
