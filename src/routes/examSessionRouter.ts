import express from 'express'
import { authorization } from '../middleware/authorization'
import {loginAttempt} from '../controllers/user'
import {addSession, deleteSession, getAllSession, updateSession} from "../controllers/examSession";

const router = express.Router()


router.post('/addSession', authorization, addSession)
router.get('/getAllSession',authorization, getAllSession)
router.put('/updateSession',authorization, updateSession)
router.delete('/deleteSession/:sessionId', authorization, deleteSession);


export default router