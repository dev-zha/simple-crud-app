import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { VTPostSchema, postSchema } from '@/validation/post';
import { Post } from '@/types';
import { createPost, updatePost } from '@/services/network/posts';

interface PostAddEditFormProps {
  post?: Post;
}

export default function PostAddEditForm({ post }: PostAddEditFormProps) {
  const navigate = useNavigate();
  const isEdit = !!post;
  const form = useForm<VTPostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: isEdit ? post.title : '',
      content: isEdit ? post.content : '',
    },
  });
  const [alert, setAlert] = useState(false);

  async function onSubmit(values: VTPostSchema) {
    const response = await (isEdit
      ? updatePost(post?.id, values)
      : createPost(values)
    ).catch((e) => e);

    if (!response.error) {
      setAlert(false);
      navigate('/');
    } else {
      setAlert(true);
    }
  }

  return (
    <div className="w-full p-4">
      {alert && (
        <Alert className="mb-4" variant="destructive">
          <AlertTitle>Post Upload Error!</AlertTitle>
          <AlertDescription>
            Some Error occure in login. Try Again
          </AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Post' : 'Create Post'}</CardTitle>
          <CardDescription>
            {isEdit
              ? 'Update post with new data'
              : 'Upload new post on timeline'}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your post content"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link to="/">Cancel</Link>
              </Button>
              <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
