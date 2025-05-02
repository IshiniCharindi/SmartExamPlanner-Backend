import express from "express";
import {authMiddleware} from "../middleware/authorization";
import {fetchDepartments} from "../controllers/Departments";

const router =express.Router()

router.get('/getAllDepartments' ,authMiddleware ,fetchDepartments)

export default router