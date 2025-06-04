import { useNavigate } from 'react-router-dom';

// This is a simple mock auth hook. In a real app, you'd integrate with your backend
export const useAuth = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const navigate = useNavigate();

  const login = () => {
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    navigate('/login');
  };

  return { isAuthenticated, login, logout };
};