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

const updateLecture = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null;

    try {
            content = await LecturerService.updateLecturer(req.body);

            if (!content) {
                proceed = false;
                message = "Lecture not found or update failed.";
            } else {
                message = "Lecture updated successfully.";
            }
        } catch (e) {
        proceed = false;
        message = "Failed to update lecture. " + (e instanceof Error ? e.message : "");
    }

    res.status(proceed ? (content ? 200 : 404) : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
};

const updateLectureAvailability = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null;

    try {
        // Extract and convert lecturerId to number
        const lecturerId = Number(req.body.lecturerId);
        const { availability } = req.body;

        if (!lecturerId || availability === undefined) {
            proceed = false;
            message = "Lecturer ID and availability are required.";
        } else {
            content = await LecturerService.updateLecturerAvailability(lecturerId, availability);

            if (!content) {
                proceed = false;
                message = "Lecture not found or update failed.";
            } else {
                message = "Lecture availability updated successfully.";
            }
        }
    } catch (e) {
        proceed = false;
        message = "Failed to update lecture availability. " + (e instanceof Error ? e.message : "");
    }

    res.status(proceed ? (content ? 200 : 404) : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
};

const deleteLecturer = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null;
    const lecturerId = Number(req.params.id);

    try {
        await LecturerService.deleteLecturer(lecturerId);
        message = 'lecturer deleted successfully';
    } catch(e) {
        proceed = false;
        message = 'server error';
        console.error('Error deleting lecturer:', e);
    }

    res.status(proceed ? 200 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
}


export {addLecturer , loadLectures ,updateLecture ,updateLectureAvailability,deleteLecturer}