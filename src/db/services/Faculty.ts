import { and, eq, like } from "drizzle-orm";
import { faculty } from "../schema";
import db from "../database";

export default class FacultyService {
    static async fetchFaculties({ name = false, facultyId = false }: { name?: string | boolean, facultyId?: number | boolean } = {}) {
        const filters: any[] = [];

        if (typeof name === 'string') {
            filters.push(like(faculty.name, `%${name}%`));
        }
        if (typeof facultyId === 'number') {
            filters.push(eq(faculty.facultyId, facultyId));
        }

        const result = await db.select({
            facultyId: faculty.facultyId,
            name: faculty.name,
        })
            .from(faculty)
            .where(filters.length > 0 ? and(...filters) : undefined)
            .orderBy(faculty.name);

        return result;
    }
}
