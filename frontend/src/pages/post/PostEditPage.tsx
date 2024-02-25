import { useParams } from 'react-router-dom';
import PostAddEditForm from './PostAddEditForm';
import { usePost } from '@/hooks/swr/usePost';
import { Post } from '@/types';

export default function PostEditPage() {
  const { id } = useParams();
  const idInt = id ? (parseInt(id) > 0 ? parseInt(id) : null) : null;
  const { data, isLoading } = usePost(idInt);
  const post = data?.data as Post;
  return isLoading ? <p>Loading...</p> : <PostAddEditForm post={post} />;
}
