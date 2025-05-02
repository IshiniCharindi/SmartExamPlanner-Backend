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
                    studentCount: examSession.studentCount
                });

            // For MySQL, the result contains insertId
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
            // Check if the session exists first
            const [existingSession] = await db.select()
                .from(examSessions)
                .where(eq(examSessions.sessionId, examSession.sessionId!))
                .limit(1);

            if (!existingSession) {
                console.log("Session not found for update:", examSession.sessionId);
                return false; // Session does not exist
            }

            // Update the session in the database
            const result = await db.update(examSessions)
                .set({
                    examDate: new Date(examSession.examDate),
                    startTime: examSession.startTime,
                    endTime: examSession.endTime,
                    subjectCode: examSession.subjectCode ?? null,
                    studentCount: examSession.studentCount,
                })
                .where(eq(examSessions.sessionId, examSession.sessionId!));

            // Check if the update operation affected any rows
            if (result && result[0]?.affectedRows > 0) {
                // Fetch the updated session
                const [updatedSession] = await db.select()
                    .from(examSessions)
                    .where(eq(examSessions.sessionId, examSession.sessionId!));

                return updatedSession || false; // Return updated session, or false if not found
            } else {
                console.log("No rows affected by the update");
                return false; // No rows were updated
            }
        } catch (error) {
            console.error("Error updating exam session:", error);
            return false; // Return false if there's an error
        }
    }
}