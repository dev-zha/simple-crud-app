import express from 'express';
import { validateRequest } from '@/middlewares/validationMiddleware';
import {
  createPost,
  getPostList,
  getPostById,
  updatePost,
  deletePost,
} from '@/controllers/postController';
import {
  createPostSchema,
  updatePostSchema,
} from '@/validators/postValidators';
import { authenticateUser } from '@/middlewares/authMiddleware';
import { verifyPostOwnership } from '@/middlewares/verifyPostOwnership';

const router = express.Router();

router.use(authenticateUser);

// Fetch all posts
router.get('/', getPostList);

// Create a new post
router.post('/', validateRequest(createPostSchema), createPost);

// Fetch a single post by ID
router.get('/:id', getPostById);

// Update a post by ID
router.put(
  '/:id',
  validateRequest(updatePostSchema),
  verifyPostOwnership,
  updatePost
);

// Delete a post by ID
router.delete('/:id', verifyPostOwnership, deletePost);

export default router;
