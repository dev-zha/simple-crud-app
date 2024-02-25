import { Request, Response, NextFunction } from 'express';
import { getPostById } from '@/dao/postDao';

export const verifyPostOwnership = async (req: Request, res: Response, next: NextFunction) => {
    const postId = parseInt(req.params.id);
    const userId = req?.user?.id;
  
    try {
      const existingPost = await getPostById(postId);
      if (!existingPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      if (existingPost.userId !== userId) {
        return res.status(403).json({ error: 'You are not authorized to perform this action' });
      }
  
      next(); // Pass control to the next middleware or route handler
    } catch (error) {
      res.status(500).json({ error: 'Error verifying post ownership' });
    }
  };
  