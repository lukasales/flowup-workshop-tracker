import { Navigate, useLocation } from 'react-router-dom';
import { USE_MOCKS } from '../services/sourceConfig';
import { isAuthenticated } from '../services/authService';

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  if (USE_MOCKS) {
    return children;
  }

  if (!isAuthenticated()) {
    return <Navigate to={`/login?reason=session-expired`} replace state={{ from: location }} />;
  }

  return children;
}
