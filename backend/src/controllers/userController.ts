import { Request, Response } from 'express';
import {
  LoginSchemaType,
  RegisterSchemaType,
} from '@/validators/authValidators';
import { compareHashData, hashData } from '@/utils/bcryptUtils';
import { createUser, getUserById, getUserByMail } from '@/dao/userDao';
import { generateToken } from '@/utils/jwtUtils';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body as RegisterSchemaType;

    // Hash the password
    const hashedPassword = await hashData(password);

    // Create the user in the database
    const fData = {
      username,
      email,
      password: hashedPassword,
    };
    const newUser = await createUser(fData);

    res.json({ data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginSchemaType;

    // Find the user by email
    const user = await getUserByMail(email, true);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify the password
    const passwordMatch = await compareHashData(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAuthUser = async (req: Request, res: Response) => {
  try {
    // Find the user by Id
    const user = await getUserById(req.user?.id as number);

    if (!user) {
      return res.status(404).json({ message: 'User not exist' });
    }

    res.json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
