import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { usePost } from '@/hooks/swr/usePost';
import { Post } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { deletePost } from '@/services/network/posts';

export default function PostDetailPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const idInt = id ? (parseInt(id) > 0 ? parseInt(id) : null) : null;
  const { data, isLoading } = usePost(idInt);
  const post = data?.data as Post;
  const [alert, setAlert] = useState(false);

  const handleDelete = async () => {
    const response = await deletePost(post.id).catch((e) => e);
    if (!response.error) {
      setAlert(false);
      navigate('/');
    } else {
      setAlert(true);
    }
  };

  return (
    <div className="p-4">
      {alert && (
        <Alert className="mb-4" variant="destructive">
          <AlertTitle>Post Delete Error!</AlertTitle>
          <AlertDescription>
            Some Error occure in login. Try Again
          </AlertDescription>
        </Alert>
      )}
      <Card className="w-full">
        <CardHeader>
          {isLoading ? (
            <>
              <Skeleton className="h-6 w-1/2" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-3/5" />
              </div>
            </>
          ) : (
            <>
              <CardTitle className="text-lg">{post?.title}</CardTitle>
              <CardDescription>{post?.content}</CardDescription>
            </>
          )}
        </CardHeader>
      </Card>
      {!isLoading && !!post && post.userId === user?.id && (
        <div className="flex justify-between mt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Post</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button asChild>
            <Link to={`/posts/${id}/edit`}>Edit</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
