import {and, eq, like} from "drizzle-orm";
import {department} from "../schema";
import db from "../database";

export default class DepartmentService{
    static async fetchDepartments({ name = false, facultyId = false }: { name?: string | boolean, facultyId?: number | boolean } = {}) {
        const filters: any[] = [];

        if (typeof name === 'string') {
            filters.push(like(department.name, `%${name}%`));
        }
        if (typeof facultyId === 'number') {
            filters.push(eq(department.facultyId, facultyId));
        }

        const result = await db.select({
            departmentId: department.departmentId,
            name: department.name,
            facultyId: department.facultyId,
        })
            .from(department)
            .where(filters.length > 0 ? and(...filters) : undefined)
            .orderBy(department.name);

        return result;
    }
}