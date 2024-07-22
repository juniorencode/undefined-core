import { Routes, Route } from 'react-router-dom';
import { MdError } from 'react-icons/md';
import { FaBookOpen, FaHome, FaTable } from 'react-icons/fa';
import { IoSettingsSharp, IoShieldSharp } from 'react-icons/io5';
import { setNavigation, setHandleLogout } from '../../lib/utilities';
import { HomePage } from '../pages/HomePage';
import { TablePage } from '../pages/TablePage';
import { FormPage } from '../pages/FormPage';
import { LoginPage } from '../pages/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { SettingsPage } from '../pages/SettingsPage';

const AppRoutes = () => {
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

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/table" element={<TablePage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};

export { AppRoutes };
