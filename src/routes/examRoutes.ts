import express from 'express';
import { allocateExamStaff } from '../controllers/examController';

const router = express.Router();

router.post('/allocate-staff', allocateExamStaff);

export default router;
