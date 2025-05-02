import db from "../database";
import {degree, faculty, lecturers} from "../schema";
import {Lecturer} from "../../models/Lecture";
import {eq} from "drizzle-orm";

export default class LecturerService {
    static async addLecturer(lecturerData:Lecturer) {
        try {
            const result = await db.transaction(async (trx) => {
                // Insert lecturer data
                await trx.insert(lecturers).values({
                    name: lecturerData.name,
                    rank: lecturerData.rank,
                    facultyId: lecturerData.facultyId,
                    availability: lecturerData.availability,
                    email: lecturerData.email,
                    phone: lecturerData.phone,
                });

            });

            return result;
        } catch (error) {
            console.error('Error adding lecturer:', error);
            throw error;
        }
    }

    static async updateLecturer(lecturerData: Lecturer) {
        try {
            const result = await db.transaction(async (trx) => {
                // Extract lecturerId from lecturerData
                const lecturerId = lecturerData.lecturerId;

                if (!lecturerId) {
                    throw new Error('Lecturer ID is required for update');
                }

                // Update lecturer data
                await trx.update(lecturers)
                    .set({
                        name: lecturerData.name,
                        rank: lecturerData.rank,
                        facultyId: lecturerData.facultyId,
                        availability: lecturerData.availability,
                        email: lecturerData.email,
                        phone: lecturerData.phone,
                    })
                    .where(eq(lecturers.lecturerId, lecturerId));

                return { success: true, message: 'Lecturer updated successfully' };
            });

            return result;
        } catch (error) {
            console.error('Error updating lecturer:', error);
            throw error;
        }
    }

    static async deleteLecturer(lecturerId: number | string) {
        try {
            const numericId = typeof lecturerId === 'string'
                ? parseInt(lecturerId, 10)
                : lecturerId;

            if (isNaN(numericId)) {
                throw new Error('Invalid lecturer ID');
            }

            const result = await db.transaction(async (trx) => {
                // First check if the lecturer exists
                const [lecturer] = await trx.select()
                    .from(lecturers)
                    .where(eq(lecturers.lecturerId, numericId))
                    .limit(1);

                if (!lecturer) {
                    throw new Error('Lecturer not found');
                }

                // Then perform the deletion
                await trx.delete(lecturers)
                    .where(eq(lecturers.lecturerId, numericId))
                    .execute(); // Use .execute() for MySQL

                return { success: true, deletedLecturer: lecturer };
            });

            return result;
        } catch (error) {
            console.error('Error deleting lecturer:', error);
            throw error;
        }
    }

    static async updateLecturerAvailability(lecturerId: number, availability: any) {
        try {
            const result = await db.transaction(async (trx) => {
                if (!lecturerId) {
                    throw new Error('Lecturer ID is required for update');
                }

                // Update only the availability field
                await trx.update(lecturers)
                    .set({
                        availability: availability
                    })
                    .where(eq(lecturers.lecturerId, lecturerId));

                return { success: true, message: 'Lecturer availability updated successfully' };
            });

            return result;
        } catch (error) {
            console.error('Error updating lecturer availability:', error);
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
                    facultyId: faculty.facultyId,
                    facultyName: faculty.name,
                })
                .from(lecturers)
                .innerJoin(faculty, eq(lecturers.facultyId, faculty.facultyId));

            return result;
        } catch (error) {
            console.error('Error fetching lecturers with details:', error);
            throw error;
        }
    }
}
