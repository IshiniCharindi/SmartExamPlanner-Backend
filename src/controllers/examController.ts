import { Request, Response } from 'express';
import { allocateStaff } from "../services/staffAllocationService";

export const allocateExamStaff = async (req: Request, res: Response) => {
    try {
        const session = req.body.session; // assuming the session data is passed in the body
        await allocateStaff(session);
        res.status(200).send('Staff allocation completed.');
    } catch (error) {
        console.error('Error allocating staff:', error);
        res.status(500).send('Error allocating staff.');
    }
};
