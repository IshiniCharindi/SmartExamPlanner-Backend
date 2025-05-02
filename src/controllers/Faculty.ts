import DepartmentService from "../db/services/Department";
import {Request, Response} from "express";
import FacultyService from "../db/services/Faculty";

const fetchFaculties = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null

    try {
        content = await FacultyService.fetchFaculties()
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

export {fetchFaculties}