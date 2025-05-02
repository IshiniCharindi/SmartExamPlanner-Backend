import {Request, Response} from "express";
import ExamHallService from "../db/services/examHall";

const fetchExamHalls = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null

    try {
        content = await ExamHallService.fetchExamHalls()
        console.log("Department",content)
        message ="category loaded successfully "
    } catch(e) {
        proceed = false
        message = 'server error'
    }


    res.status(proceed ? 200 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    })
}

export {fetchExamHalls}