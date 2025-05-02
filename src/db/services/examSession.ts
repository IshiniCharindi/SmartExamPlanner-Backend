import db from "../database";
import { examSessions } from "../schema";
import {ExamSession} from "../../models/examSession";

export default class ExamSessionServices {

    static async addSession(examSession: ExamSession) {
        try {
            const [insertedSession] = await db.insert(examSessions).values({
                examDate: new Date(examSession.examDate),
                startTime: examSession.startTime,
                endTime: examSession.endTime,
                subjectCode: examSession.subjectCode ?? null,
                studentCount: examSession.studentCount
            }).$returningId();

            return insertedSession || false;
        } catch (error) {
            console.error("Error adding exam session:", error);
            return false;
        }
    }
    static async getAllSession() {
        try {
            // Fetch all sessions from the database
            const sessions = await db.select().from(examSessions);
            return sessions || [];
        } catch (error) {
            console.error("Error fetching exam sessions:", error);
            return false;
        }
    }
}