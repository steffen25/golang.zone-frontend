import { ContentLayout } from '@/components/Layout';
import { CreatePost } from '../components/CreatePost';
import { usePosts } from '@/features/posts/hooks/usePosts';
import { Link, Spinner } from '@/components/Elements';
import { Post } from '@/features/posts/types';
import { PostCard } from '@/features/posts/components/PostCard';
import * as React from 'react';

export const Posts = () => {
  const [page, setPage] = React.useState<number>(1);
  const postsQuery = usePosts({ page, config: { staleTime: 5000, keepPreviousData: true } });

  if (postsQuery.isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!postsQuery.data?.posts) return null;

  const pagination = postsQuery.data.pagination;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ContentLayout title="Posts">
      <div className="flex justify-end">
        <CreatePost />
      </div>
      <div className="mt-4">
        {postsQuery.data.posts.map((post: Post, index: number) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
      <div className="flex flex-row">
        <div className="flex-1 text-left">
          <Link
            to={`./?page=${pagination.currentPage - 1}`}
            className="text-gray-900 font-bold text-xl mb-2"
          >
            <button
              onClick={() => {
                setPage((page: number) => page - 1);
                scrollToTop();
              }}
              disabled={!pagination.prevPageUrl}
              className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-l disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
          </Link>
        </div>

        <span className="flex-1 text-center">
          Page {pagination.currentPage} of {pagination.lastPage}
        </span>

        <div className="flex-1 text-right">
          <Link
            to={`./?page=${pagination.currentPage + 1}`}
            className="text-gray-900 font-bold text-xl mb-2"
          >
            <button
              onClick={() => {
                setPage((page: number) => page + 1);
                scrollToTop();
              }}
              disabled={!pagination.nextPageUrl}
              className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-l disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </ContentLayout>
  );
};
