import * as React from 'react';
import { useAuthStore } from '@/hooks/useAuth';

type GuestProps = { children: React.ReactNode };

export const Guest = ({ children }: GuestProps) => {
  const user = useAuthStore((state) => state.user);

  return <>{!user ? children : null}</>;
};
