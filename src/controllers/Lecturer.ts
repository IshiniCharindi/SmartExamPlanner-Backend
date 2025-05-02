import {Request, Response} from "express"
import LecturerService from "../db/services/Lecturer";

const addLecturer = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null

    try {
        await LecturerService.addLecturer(req.body)
        message = "order Successfully saved"
    } catch (error) {
        message = "order not places";
        proceed = false
    }
    res.status(proceed ? 200 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    })
}

const loadLectures = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null;

    try {
        content = await LecturerService.fetchLectures();
    } catch (e) {
        proceed = false;
        message = "Failed to load lectures.";
    }

    res.status(proceed ? 200 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
};


export {addLecturer , loadLectures}