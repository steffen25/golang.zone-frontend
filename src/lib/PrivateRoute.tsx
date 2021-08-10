import * as React from 'react';
import { useAuthStore } from '@/hooks/useAuth';
import { Route, Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  caseSensitive?: boolean;
  children?: React.ReactNode;
  element?: React.ReactElement | null;
  path?: string;
};

export const PrivateRoute = ({ caseSensitive, children, element, path }: PrivateRouteProps) => {
  const { user } = useAuthStore();

  return (
    <Route
      caseSensitive={caseSensitive}
      children={children}
      element={user ? element : <Navigate to="/auth/login" />}
      path={path}
    />
  );
};
