import { Navigate, Route, Routes } from 'react-router-dom';
import App from '../App';
import ProtectedRoute from '../components/ProtectedRoute';
import DashboardPage from '../pages/DashboardPage';
import ColaboradoresPage from '../pages/ColaboradoresPage';
import LoginPage from '../pages/LoginPage';
import WorkshopDetailsPage from '../pages/WorkshopDetailsPage';
import WorkshopsPage from '../pages/WorkshopsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<App />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/colaboradores"
          element={
            <ProtectedRoute>
              <ColaboradoresPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workshops"
          element={
            <ProtectedRoute>
              <WorkshopsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workshops/:id"
          element={
            <ProtectedRoute>
              <WorkshopDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
