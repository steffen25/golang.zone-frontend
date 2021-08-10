import * as React from 'react';
import { useAuthStore } from '@/hooks/useAuth';
import { Navigate, Route } from 'react-router-dom';

type GuestRouteProps = {
  caseSensitive?: boolean;
  children?: React.ReactNode;
  element?: React.ReactElement | null;
  path?: string;
};

export const GuestRoute = ({ caseSensitive, children, element, path }: GuestRouteProps) => {
  const { user } = useAuthStore();

  return (
    <Route
      caseSensitive={caseSensitive}
      children={children}
      element={!user ? element : <Navigate to="/" />}
      path={path}
    />
  );
};
