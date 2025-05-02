import express from 'express'
import {authMiddleware, authorization} from '../middleware/authorization'
import {loginAttempt} from '../controllers/user'
import {addSession, deleteSession, getAllSession, updateSession} from "../controllers/examSession";

const router = express.Router()


router.post('/addSession', authMiddleware, addSession)
router.get('/getAllSession',authMiddleware, getAllSession)
router.put('/updateSession',authMiddleware, updateSession)
router.delete('/deleteSession/:sessionId', authMiddleware, deleteSession);


export default router