import { Navigate, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  return Auth.loggedIn() ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoute;