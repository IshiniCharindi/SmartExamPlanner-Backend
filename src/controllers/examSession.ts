import { Request, Response } from "express";
import ExamSessionServices from "../db/services/examSession";

const addSession = async (req: Request, res: Response) => {
    let proceed = false, message = null, content = null

    try {
        // console.log("Request",req.body)
        content = await ExamSessionServices.addSession(req.body)
        console.log("content",content)
        if(content) {
            proceed=true
            message = 'session added successfully';
        }
        else message = 'session adding failed';
    } catch(e) {
        proceed = false
        message = 'server error'
    }


    res.status(200).json({
        proceed: proceed,
        message: message,
        content: content
    })
}

const getAllSession = async (req: Request, res: Response) => {
    let proceed = false, message = null, content = null

    try {
        // console.log("Request",req.body)
        content = await ExamSessionServices.getAllSession()
        console.log("content",content)
        if(content) {
            proceed=true
            message = 'sessions fetched successfully';
        }
        else message = 'sessions fetching failed';
    } catch(e) {
        proceed = false
        message = 'server error'
    }


    res.status(200).json({
        proceed: proceed,
        message: message,
        content: content
    })
}

const updateSession = async (req: Request, res: Response) => {
    let proceed = false, message = null, content = null

    try {
        console.log("Request update",req.body)
        content = await ExamSessionServices.updateSession(req.body)
        console.log("content",content)
        if(content) {
            proceed=true
            message = 'sessions updated successfully successfully';
        }
        else message = 'sessions updating failed';
    } catch(e) {
        proceed = false
        message = 'server error'
    }


    res.status(200).json({
        proceed: proceed,
        message: message,
        content: content
    })
}

const deleteSession = async (req: Request, res: Response) => {
    let proceed = false, message = null, content = null;

    const sessionId = req.params.sessionId;  // Extract sessionId from the URL parameters

    try {
        console.log("Deleting session with ID:", sessionId);
        content = await ExamSessionServices.deleteSession(sessionId); // Pass the sessionId to the service layer
        console.log("content", content);

        if (content) {
            proceed = true;
            message = 'Session deleted successfully';
        } else {
            message = 'Session deletion failed';
        }
    } catch (error) {
        proceed = false;
        message = 'Server error';
        console.error("Error deleting session:", error);
    }

    res.status(200).json({
        proceed: proceed,
        message: message,
        content: content
    });
};

export {
    addSession,
    getAllSession,
    updateSession,
    deleteSession
}