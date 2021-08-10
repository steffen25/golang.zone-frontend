import React from 'react';
import { MainLayout } from '@/components/Layout';
import { Navigate, Outlet, Route, Routes as ReactRoutes } from 'react-router-dom';
import { Dashboard } from '@/features/misc';
import { PostsRoutes } from '@/features/posts';
import { AuthRoutes } from '@/features/auth';
import { GuestRoute } from '@/lib/GuestRoute';

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const Routes: React.FC = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/posts/*" element={<PostsRoutes />} />

        <GuestRoute path="/auth/*" element={<AuthRoutes />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </ReactRoutes>
  );
};
