import express from "express";
import {authMiddleware} from "../middleware/authorization";
import {fetchExamHalls} from "../controllers/examHall";

const router =express.Router()

router.get('/getAllExamHalls' ,authMiddleware ,fetchExamHalls)

export default router