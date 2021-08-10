import * as React from 'react';
import { Role, useAuthStore } from '@/hooks/useAuth';

type RoleTypes = keyof typeof Role;

export const useAuthorization = () => {
  const { user } = useAuthStore();

  if (!user) {
    throw Error('User does not exist!');
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0) {
        return allowedRoles?.includes(user.role);
      }

      return true;
    },
    [user.role]
  );

  return { checkAccess, role: user.role };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policy?: never;
    }
  | {
      allowedRoles?: never;
      policy: boolean;
    }
);

// <Authorization allowedRoles={ [Role.ADMIN] }>
// <Authorization policy={ PostPolicy.canUpdate(user as User, post as Post) }>
export const Authorization = ({
  policy,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policy !== 'undefined') {
    canAccess = policy;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
