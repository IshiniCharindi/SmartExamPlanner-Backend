import express from "express";
import {authMiddleware} from "../middleware/authorization";
import {fetchDepartments} from "../controllers/Departments";
import {fetchFaculties} from "../controllers/Faculty";

const router =express.Router()

router.get('/getAllFaculties' ,authMiddleware ,fetchFaculties)

export default router