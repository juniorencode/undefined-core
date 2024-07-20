import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { TablePage } from '../pages/TablePage';
import { FormPage } from '../pages/FormPage';
import { LoginPage } from '../pages/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { SettingsPage } from '../pages/SettingsPage';
import { setLink, setNavLink } from '../../lib/main';

const AppRoutes = () => {
  setLink(Link);
  setNavLink(NavLink);

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
