import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicRoute from '../components/auth/PublicRoute';
import PrivateRoute from '../components/auth/PrivateRoute';

// Lazy load Pages
const Login = lazy(() => import('../pages/Auth/login/Login'));
const Register = lazy(() => import('../pages/Auth/register/Register'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Profile = lazy(() => import('../pages/profile/Profile'));
const NotFound = lazy(() => import('../pages/not-found/NotFound'));

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex items-center justify-center h-screen text-2xl font-semibold text-primary">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
