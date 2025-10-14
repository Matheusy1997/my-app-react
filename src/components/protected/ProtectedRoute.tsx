import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Verifica se o token existe no localStorage
  const token = localStorage.getItem('authToken');

  // Se o token existe, renderiza a página solicitada (usando <Outlet />)
  // Se não, redireciona para a página de login
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;