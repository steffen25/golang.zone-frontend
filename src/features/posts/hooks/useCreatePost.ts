import { useMutation } from 'react-query';
import {Notification, useNotificationStore} from '@/hooks/useNotificationStore';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { createPost } from '../api';
import { Post } from '../types';

type UseCreatePostOptions = {
    config?: MutationConfig<typeof createPost>;
};

export const useCreatePost = ({ config }: UseCreatePostOptions = {}) => {
    const { addNotification } = useNotificationStore();

    return useMutation({
        onMutate: async (newPost) => {
            await queryClient.cancelQueries('posts');

            const previousPosts = queryClient.getQueryData<Post[]>('posts');

            queryClient.setQueryData('posts', [...(previousPosts || []), newPost.data]);

            return { previousPosts };
        },
        onError: (_, __, context: any) => {
            if (context?.previousPosts) {
                queryClient.setQueryData('posts', context.previousPosts);
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries('posts');

            addNotification({
                type: 'success',
                title: 'Post Created',
            } as Notification);
        },
        ...config,
        mutationFn: createPost,
    });
};