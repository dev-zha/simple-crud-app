import { PostCard } from '@/components/PostCard';
import { usePosts } from '@/hooks/swr/usePosts';
import { Post } from '@/types';
import React from 'react';
import { PostPagination } from './PostPagination';
import { useRouterQuery } from '@/hooks/useRouterQuery';

const HomePage: React.FC = () => {
  const query = useRouterQuery();
  const page = query?.page ? parseInt(query.page) : 1;
  const { data } = usePosts(page);
  const posts = data?.data as Post[];
  const meta = data?.meta;

  return (
    <div className="p-4">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts?.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
      {!!posts && !!meta && <PostPagination data={meta} />}
    </div>
  );
};

export default HomePage;
