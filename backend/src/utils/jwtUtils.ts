import jwt from 'jsonwebtoken';

// Generate JWT token
export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

// Decode JWT token
export const decodeToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
  ;
};
