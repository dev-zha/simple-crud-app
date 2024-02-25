import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Post } from '@/types';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2 hover:underline cursor-pointer">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {post.content}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
