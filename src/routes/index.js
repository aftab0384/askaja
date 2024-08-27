import { useRoutes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Import your routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

export default function ThemeRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirected,setRedirected]=useState(false);
  const navigate = useNavigate();

  // useEffect to verify token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
   // console.log("token in useEffect:", token);

    const interceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    if (!token) {
      setRedirected(false);
      navigate('/login');
      return; // Stop execution if no token
    }

    const verifyToken = async () => {
      try {
        const result = await axios.get('http://localhost:8080/api/public/verifyJwtToken');
       // console.log('status after verify token', result.status);
        setIsAuthenticated(true);
        setRedirected(true);
        //navigate('/dashboard'); // Navigate after successful verification
      } catch (err) {
        setRedirected(false)
        console.error('Error occurred during token verification:', err.response);
         handleLogout(); // Logout if verification fails
      }
    };

    verifyToken();
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [isAuthenticated,navigate]); // Empty dependency array to only run on mount

  // Handle logout and cleanup
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    navigate('/login');
  };

  // console.log('isAuthenticated:', isAuthenticated);
  // console.log('MainRoutes:', MainRoutes);
  // console.log('AuthenticationRoutes:', AuthenticationRoutes);
  // Conditionally render routes based on authentication status
  const routes = useRoutes(redirected ? MainRoutes : AuthenticationRoutes);
  return routes;
}
