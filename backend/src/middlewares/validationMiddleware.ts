import { Request, Response, NextFunction } from 'express';
import { Schema, ZodError } from 'zod';

export const validateRequest = (schema: Schema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync(req.body);
      // req.body = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // If it's a ZodError, extract error messages and pass them to the next middleware
        res.status(400).json({ errors: error.message });
      } else {
        // If it's not a ZodError, rethrow the error
        throw error;
      }
    }
  };
};
