import db from "../database";
import { examSessions } from "../schema";
import { ExamSession } from "../../models/examSession";
import { eq } from "drizzle-orm";

export default class ExamSessionServices {
    static async addSession(examSession: ExamSession) {
        try {
            const result = await db.insert(examSessions)
                .values({
                    examDate: new Date(examSession.examDate),
                    startTime: examSession.startTime,
                    endTime: examSession.endTime,
                    subjectCode: examSession.subjectCode ?? null,
                    studentCount: examSession.studentCount,
                    degreeId: examSession. departmentId // Add this line
                });

            if (result && result[0].insertId) {
                const [insertedSession] = await db.select()
                    .from(examSessions)
                    .where(eq(examSessions.sessionId, result[0].insertId));
                return insertedSession || false;
            }
            return false;
        } catch (error) {
            console.error("Error adding exam session:", error);
            return false;
        }
    }

    static async getAllSession() {
        try {
            const sessions = await db.select().from(examSessions);
            return sessions || [];
        } catch (error) {
            console.error("Error fetching exam sessions:", error);
            return false;
        }
    }

    static async updateSession(examSession: ExamSession) {
        try {
            const [existingSession] = await db.select()
                .from(examSessions)
                .where(eq(examSessions.sessionId, examSession.sessionId!))
                .limit(1);

            if (!existingSession) {
                console.log("Session not found for update:", examSession.sessionId);
                return false;
            }

            const result = await db.update(examSessions)
                .set({
                    examDate: new Date(examSession.examDate),
                    startTime: examSession.startTime,
                    endTime: examSession.endTime,
                    subjectCode: examSession.subjectCode ?? null,
                    studentCount: examSession.studentCount,
                    degreeId: examSession. departmentId // Add this line
                })
                .where(eq(examSessions.sessionId, examSession.sessionId!));

            if (result && result[0]?.affectedRows > 0) {
                const [updatedSession] = await db.select()
                    .from(examSessions)
                    .where(eq(examSessions.sessionId, examSession.sessionId!));
                return updatedSession || false;
            } else {
                console.log("No rows affected by the update");
                return false;
            }
        } catch (error) {
            console.error("Error updating exam session:", error);
            return false;
        }
    }

    static async deleteSession(sessionId: string) {
        try {
            // Ensure sessionId is converted to a number, since it's expected to be a number in the database schema
            const sessionIdNumber = Number(sessionId);

            if (isNaN(sessionIdNumber)) {
                console.log("Invalid sessionId: Not a valid number");
                return false;
            }

            // Delete session from the database using the number type
            const result = await db.delete(examSessions)
                .where(eq(examSessions.sessionId, sessionIdNumber));

            if (result && result[0]?.affectedRows > 0) {
                return true; // Return true if deletion is successful
            } else {
                console.log("Session not found or no rows deleted");
                return false; // No session found to delete or no rows were deleted
            }
        } catch (error) {
            console.error("Error deleting exam session:", error);
            return false; // Return false if an error occurs
        }
    }
}