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

export {
    addSession,
    getAllSession,
    updateSession
}