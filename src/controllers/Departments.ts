import DepartmentService from "../db/services/Department";
import {Request, Response} from "express";

const fetchDepartments = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null

    try {
        content = await DepartmentService.fetchDepartments()
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

export {fetchDepartments}
