import db from "../database";
import {department, faculty, lecturers} from "../schema";
import {Lecturer} from "../../models/Lecture";
import {eq} from "drizzle-orm";

export default class LecturerService {
    static async addLecturer(lecturerData:Lecturer) {
        try {
            const result = await db.transaction(async (trx) => {
                // Insert lecturer data
                await trx.insert(lecturers).values({
                    name: lecturerData.name,
                    departmentId: lecturerData.departmentId,
                    rank: lecturerData.rank,
                    facultyId: lecturerData.facultyId,
                    availability: lecturerData.availability,
                    email: lecturerData.email,
                    phone: lecturerData.phone,
                });

                // You can add more logic here if needed
                // e.g., Logging, Notification, etc.
            });

            return result;
        } catch (error) {
            console.error('Error adding lecturer:', error);
            throw error;
        }
    }

    static async fetchLectures() {
        try {
            const result = await db
                .select({
                    lecturerId: lecturers.lecturerId,
                    name: lecturers.name,
                    rank: lecturers.rank,
                    availability: lecturers.availability,
                    email: lecturers.email,
                    phone: lecturers.phone,
                    departmentId: department.departmentId,
                    departmentName: department.name,
                    facultyId: faculty.facultyId,
                    facultyName: faculty.name,
                })
                .from(lecturers)
                .innerJoin(department, eq(lecturers.departmentId, department.departmentId))
                .innerJoin(faculty, eq(lecturers.facultyId, faculty.facultyId));

            return result;
        } catch (error) {
            console.error('Error fetching lecturers with details:', error);
            throw error;
        }
    }
}
