import express from "express";
import {authMiddleware} from "../middleware/authorization";
import {
    addLecturer,
    deleteLecturer,
    loadLectures,
    updateLecture,
    updateLectureAvailability
} from "../controllers/Lecturer";

const router =express.Router()

router.post('/add' ,authMiddleware ,addLecturer)
router.put('/update' ,authMiddleware ,updateLecture)
router.put('/availability' ,authMiddleware ,updateLectureAvailability)
router.get('/all' ,authMiddleware ,loadLectures)
router.delete('/delete/:id', authMiddleware, deleteLecturer);



export default router