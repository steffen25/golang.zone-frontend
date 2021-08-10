import { AuthUser } from '@/features/auth';
import { Post } from '@/features/posts/types';
import { Role } from '@/hooks/useAuth';

type Policy = {
  canCreate: (user: AuthUser | null) => boolean;
  canUpdate: (user: AuthUser | null, post: Post) => boolean;
};

export const PostPolicy = {
  canCreate: (user: AuthUser | null): boolean => {
    if (!user) {
      return false;
    }

    return [Role.USER, Role.ADMIN].includes(user.role);
  },
  canUpdate: (user: AuthUser | null, post: Post): boolean => {
    if (!user) {
      return false;
    }

    if (user.role === Role.ADMIN) {
      return true;
    }

    return user.role === Role.USER && user.id === post.userId;
  },
} as Policy;
