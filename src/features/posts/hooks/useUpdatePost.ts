import { useMutation } from 'react-query';
import {Notification, useNotificationStore} from '@/hooks/useNotificationStore';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { updatePost } from '../api';
import { Post } from '../types';

type UseUpdatePostOptions = {
    config?: MutationConfig<typeof updatePost>;
};

export const useUpdatePost = ({ config }: UseUpdatePostOptions = {}) => {
    const { addNotification } = useNotificationStore();

    return useMutation({
        onMutate: async (updatingPost: any) => {
            await queryClient.cancelQueries(['post', updatingPost?.postId]);

            const previousPost = queryClient.getQueryData<Post>([
                'post',
                updatingPost?.postId,
            ]);

            queryClient.setQueryData(['post', updatingPost?.postId], {
                ...previousPost,
                ...updatingPost.data,
                id: updatingPost.postId,
            });

            return { previousPost };
        },
        onError: (_, __, context: any) => {
            if (context?.previousPost) {
                queryClient.setQueryData(['post', context.previousPost.id], context.previousPost);
            }
        },
        onSuccess: async (data) => {
            await queryClient.refetchQueries(['post', data.id]);

            addNotification({
                type: 'success',
                title: 'Post Updated',
            } as Notification);
        },
        ...config,
        mutationFn: updatePost,
    });
};
