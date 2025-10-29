import { Router } from 'express';
import { signup, login, forgotPassword, refreshToken } from '../controllers/auth/authentication';
import { loginLimiter } from '../middlewares/rateLimiter';

const router = Router();

router.post('/signup', signup);
router.post('/login', loginLimiter, login);
router.post('/forgot-password', forgotPassword);
router.post('/refresh-token', refreshToken);

export default router;