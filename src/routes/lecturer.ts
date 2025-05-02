import express from "express";
import {authMiddleware} from "../middleware/authorization";
import {addLecturer, loadLectures} from "../controllers/Lecturer";

const router =express.Router()

router.post('/add' ,authMiddleware ,addLecturer)
router.get('/all' ,authMiddleware ,loadLectures)

export default router