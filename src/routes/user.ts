import express from 'express'
import { authorization } from '../middleware/authorization'
import {loginAttempt} from '../controllers/user'

const router = express.Router()


router.post('/loginAttempt', authorization, loginAttempt)

export default router