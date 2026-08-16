import { Navigate, Route, Routes } from 'react-router-dom';
import App from '../App';
import DashboardPage from '../pages/DashboardPage';
import ColaboradoresPage from '../pages/ColaboradoresPage';
import WorkshopsPage from '../pages/WorkshopsPage';
import WorkshopDetailsPage from '../pages/WorkshopDetailsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<DashboardPage />} />
        <Route path="/colaboradores" element={<ColaboradoresPage />} />
        <Route path="/workshops" element={<WorkshopsPage />} />
        <Route path="/workshops/:id" element={<WorkshopDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
