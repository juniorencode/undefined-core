import { BrowserRouter } from 'react-router-dom';
import { FaBookOpen, FaHome, FaTable } from 'react-icons/fa';
import { AppRoutes } from './routes/app.routes';
import { setNavigation, setHandleLogout } from '../lib/main';
import { MdError } from 'react-icons/md';
import { IoSettingsSharp, IoShieldSharp } from 'react-icons/io5';

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
  },
  {
    label: 'Login',
    path: '/login',
    icon: <IoShieldSharp size={18} />
  },
  {
    label: 'Not Found',
    path: '/not-found',
    icon: <MdError size={18} />
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: <IoSettingsSharp size={18} />
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
