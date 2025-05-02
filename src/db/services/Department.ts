import { and, eq, like } from "drizzle-orm";
import { degree } from "../schema";
import db from "../database";

export default class DepartmentService {
    static async fetchDepartments({ name = false, facultyId = false }: { name?: string | boolean, facultyId?: number | boolean } = {}) {
        const filters: any[] = [];

        if (typeof name === 'string') {
            filters.push(like(degree.name, `%${name}%`));  // Fixed: Proper template literal syntax
        }
        if (typeof facultyId === 'number') {
            filters.push(eq(degree.facultyId, facultyId));
        }

        const result = await db.select({
            degreeId: degree.degreeId,
            name: degree.name,
            facultyId: degree.facultyId,
        })
            .from(degree)
            .where(filters.length > 0 ? and(...filters) : undefined)
            .orderBy(degree.name);

        return result;
    }
}