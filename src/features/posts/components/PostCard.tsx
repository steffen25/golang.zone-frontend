import * as React from 'react';
import { Post } from '@/features/posts/types';
import { Link } from 'react-router-dom';
import { MDPreview } from '@/components/Elements';

export type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  if (!post) {
    return null;
  }

  return (
    <div className="w-full lg:max-w-full lg:flex mb-4">
      <div className="w-full border border-gray-400 lg:border-gray-400 bg-white rounded-b p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <Link to={`./${post.slug}`} className="text-gray-900 font-bold text-xl mb-2">
            {post.title}
          </Link>

          <div className="text-gray-700 text-base overflow-hidden line-clamp-3">
            <MDPreview value={post.body} />
          </div>
        </div>

        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{post.author}</p>
            <p className="text-gray-600">{post.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
