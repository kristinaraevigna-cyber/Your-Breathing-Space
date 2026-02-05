import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import WeekView from './pages/WeekView';
import Journal from './pages/Journal';
import Actions from './pages/Actions';
import Library from './pages/Library';
import Coach from './pages/Coach';
import Settings from './pages/Settings';
import GDPRConsent from './pages/GDPRConsent';

const queryClient = new QueryClient();

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className='loading'>Loading...</div>;
  return user ? children : <Navigate to='/login' />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/consent' element={<GDPRConsent />} />
            <Route path='/onboarding' element={
              <ProtectedRoute><Onboarding /></ProtectedRoute>
            } />
            <Route path='/dashboard' element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path='/week/:weekNumber' element={
              <ProtectedRoute><WeekView /></ProtectedRoute>
            } />
            <Route path='/journal' element={
              <ProtectedRoute><Journal /></ProtectedRoute>
            } />
            <Route path='/actions' element={
              <ProtectedRoute><Actions /></ProtectedRoute>
            } />
            <Route path='/library' element={
              <ProtectedRoute><Library /></ProtectedRoute>
            } />
            <Route path='/coach' element={
              <ProtectedRoute><Coach /></ProtectedRoute>
            } />
            <Route path='/settings' element={
              <ProtectedRoute><Settings /></ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}