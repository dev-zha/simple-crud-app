import { Request, Response } from 'express';
import {
  CreatePostSchemaType,
  UpdatePostSchemaType,
} from '@/validators/postValidators';
import * as postDao from '@/dao/postDao';

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body as CreatePostSchemaType;
  const userId = req?.user?.id as number;

  try {
    const fPostData = {
      title,
      content,
      userId,
    };
    const post = await postDao.createPost(fPostData);

    res.status(201).json({ message: 'Post created successfully', data: post });
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
};

// Fetch Post List
interface SearchFilterParams {
  kw?: string;
  page?: string;
  limit?: string;
}
export const getPostList = async (
  req: Request<SearchFilterParams>,
  res: Response
) => {
  try {
    const reqQuery = req.query as SearchFilterParams;
    const page = parseInt(reqQuery.page || '1');
    const limit = Math.min(20, parseInt(reqQuery.limit || '10'));
    const searchKeyword = reqQuery?.kw || '';

    const posts = await postDao.getPostList(page, limit, searchKeyword);
    const totalPosts = await postDao.getPostCount(searchKeyword);
    const totalPages = Math.ceil(totalPosts / limit);

    res.json({
      data: posts,
      meta: {
        total: totalPosts,
        totalPages,
        currentPage: page,
        limit,
        searchKeyword,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

// Fetch a single post by ID
export const getPostById = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);

  try {
    const post = await postDao.getPostById(postId);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json({ data: post });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching post' });
  }
};

// Update a post by ID
export const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body as UpdatePostSchemaType;

    const fPostData = {
      id: postId,
      title,
      content,
    };
    const updatedPost = await postDao.updatePost(fPostData);
    res.json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    res.status(500).json({ error: 'Error updating post' });
  }
};

// Delete a post by ID
export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    await postDao.deletePost(postId);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
};
