import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './hooks/provider/AuthProvider';
import Router from './Router.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}
