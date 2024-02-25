import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '@/utils/jwtUtils';
import { getUserById } from '@/dao/userDao';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the JWT token from the request headers
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    // Verify the JWT token
    const decodedData = decodeToken(token);

    // Fetch the user from the database based on the decoded user ID
    const user = await getUserById(decodedData.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the user to the request object
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
