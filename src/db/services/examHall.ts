import { eq, like, and } from "drizzle-orm";
import { examHalls } from "../schema";
import db from "../database";

export default class ExamHallService {

    static async fetchExamHalls({
                                    hallName = false,
                                    maxCapacity = false,
                                }: {
        hallName?: string | boolean;
        maxCapacity?: number | boolean;
    } = {}) {
        const filters: any[] = [];

        if (typeof hallName === "string") {
            filters.push(like(examHalls.hallName, `%${hallName}%`));
        }
        if (typeof maxCapacity === "number") {
            filters.push(eq(examHalls.maxCapacity, maxCapacity));
        }

        const result = await db
            .select({
                hallId: examHalls.hallId,
                hallName: examHalls.hallName,
                maxCapacity: examHalls.maxCapacity,
            })
            .from(examHalls)
            .where(filters.length > 0 ? and(...filters) : undefined)
            .orderBy(examHalls.hallName);

        return result;
    }
}


