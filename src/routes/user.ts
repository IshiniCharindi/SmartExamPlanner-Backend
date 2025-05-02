import express from 'express'
import { authMiddleware, authorization } from '../middleware/authorization';
import {loginAttempt, protectedAccess} from '../controllers/user'

const router = express.Router()


router.post('/loginAttempt', authorization, loginAttempt)
router.get('/protected', authMiddleware,protectedAccess);
export default router