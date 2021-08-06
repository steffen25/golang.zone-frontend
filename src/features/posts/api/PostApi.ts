import { axios } from '@/lib/axios';
import {
    CreatePostOptions,
    GetPostOptions, GetPostsOptions, PagedPosts,
    Post, PostsResponse,
    UpdatePostOptions
} from '../types';

const defaultPagedValues = {
    page: 1,
    perpage: 10
}

const getPosts = async ({ page, perPage }: GetPostsOptions = defaultPagedValues): Promise<PagedPosts> => {
    const { data: posts, pagination }: PostsResponse = await axios.get('/posts', {
        params: {
            page,
            perpage: perPage
        }
    });

    return { posts, pagination };
};

const getPost = async ({ postId }: GetPostOptions): Promise<Post> => {
    const { data: response } = await axios.get(`/posts/${postId}`);

    return response;
};

const createPost = async ({ data }: CreatePostOptions): Promise<Post> => {
    const { data: response } = await axios.post(`/posts`, data);

    return response;
};

const updatePost = async ({ data, postId }: UpdatePostOptions): Promise<Post> => {
    const { data: response } = await axios.patch(`/posts/${postId}`, data);

    return response;
};

export {
    getPosts,
    getPost,
    createPost,
    updatePost,
}
