import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function AuthLayout() {
  // Auth Provider
  const { user } = useAuth();
  // Navigate
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <div className='flex items-center justify-center w-full min-h-screen'>
      <Outlet />
    </div>
  );
}
