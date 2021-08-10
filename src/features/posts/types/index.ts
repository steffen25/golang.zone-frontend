import { BaseEntity, Pagination } from '@/types';

export type Post = {
  id: string;
  userId: string;
  author: string;
  title: string;
  slug: string;
  body: string;
} & BaseEntity;

export type PostsResponse = {
  data: Post[];
  pagination: Pagination;
  success: boolean;
};

export type PagedPosts = {
  posts: Post[];
  pagination: Pagination;
};

export type PostBody = {
  title: string;
  body: string;
};

export type CreatePostOptions = {
  data: PostBody;
};

export type UpdatePostOptions = {
  data: PostBody;
  postId: string;
};

export type GetPostsOptions = {
  page?: number;
  perPage?: number;
};

export type GetPostOptions = {
  postId: string;
};

export type PostValues = {
  title: string;
  body: string;
};

export type UpdatePostProps = {
  postId: string;
};
