import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { TablePage } from '../pages/TablePage';
import { FormPage } from '../pages/FormPage';
import { NotFoundLayout } from '../../lib/main';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/table" element={<TablePage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/not-found" element={<NotFoundLayout />} />
    </Routes>
  );
};

export { AppRoutes };
