import { useQuery } from 'react-query';
import { QueryConfig } from '@/lib/react-query';
import { getPost } from '../api';

type UsePostOptions = {
    postId: string;
    config?: QueryConfig<typeof getPost>;
};

export const usePost = ({ postId, config }: UsePostOptions) => {
    return useQuery({
        ...config,
        queryKey: ['post', postId],
        queryFn: () => getPost({ postId }),
    });
};
