import { useQuery } from 'react-query';
import { QueryConfig } from '@/lib/ReactQuery';
import { getPosts } from '../api';

type UsePostsOptions = {
  page?: number;
  perPage?: number;
  config?: QueryConfig<typeof getPosts>;
};

export const usePosts = ({ config, page, perPage }: UsePostsOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ['posts', page],
    queryFn: () => getPosts({ page, perPage }),
  });
};
