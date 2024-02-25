import express from 'express';
import { authenticateUser } from '@/middlewares/authMiddleware';
import { validateRequest } from '@/middlewares/validationMiddleware';
import { getAuthUser, login, register } from '@/controllers/userController';
import { loginSchema, registerSchema } from '@/validators/authValidators';

const router = express.Router();

// User registration
router.post('/register', validateRequest(registerSchema), register);

// User login
router.post('/login', validateRequest(loginSchema), login);

// Get current user
router.get('/me', authenticateUser, getAuthUser);

export default router;
