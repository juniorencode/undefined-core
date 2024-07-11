import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { TablePage } from '../pages/TablePage';
import { FormPage } from '../pages/FormPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/table" element={<TablePage />} />
      <Route path="/form" element={<FormPage />} />
    </Routes>
  );
};

export { AppRoutes };
