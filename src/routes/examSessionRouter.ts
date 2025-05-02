import express from 'express'
import { authorization } from '../middleware/authorization'
import {loginAttempt} from '../controllers/user'
import {addSession} from "../controllers/examSession";

const router = express.Router()


router.post('/addSession', authorization, addSession)

export default router