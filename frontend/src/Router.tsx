import { Route, Routes } from 'react-router-dom';
// Layouts
import AppLayout from '@/components/layout/AppLayout';
import AuthLayout from '@/components/layout/AuthLayout';
// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from '@/pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import PostCreatePage from './pages/post/PostCreatePage';
import PostEditPage from './pages/post/PostEditPage';
import PostDetailPage from './pages/post/PostDetailPage';

export default function Router() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/create" element={<PostCreatePage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/:id/edit" element={<PostEditPage />} />
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
