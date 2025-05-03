import { or, eq } from "drizzle-orm";
import db from "../database";
import { users } from "../schema";
import { checkPassword } from "../../middleware/hashing";
import { User } from "../../models/user";

export default class UserServices {
    static async loginAttempt(userCredentials: User): Promise<User | false> {
        const identifier = userCredentials.email || userCredentials.username || '';
        const password = userCredentials.password || '';

        if (!identifier || !password) {
            return false;
        }

        try {
            const result = await db.query.users.findFirst({
                where: or(
                    eq(users.email, identifier),
                    eq(users.username, identifier)
                )
            });

            if (!result) return false;

            const passwordMatch = await checkPassword(password, result.password);
            if (!passwordMatch) return false;

            const { password: _, ...userWithoutPassword } = result;
            return userWithoutPassword as User;

        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    }
}