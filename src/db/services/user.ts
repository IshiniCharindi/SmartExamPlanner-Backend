import { eq } from "drizzle-orm";
import db from "../database";
import { users } from "../schema";
import {checkPassword, createHash} from "../../middleware/hashing";
import bcrypt from "bcrypt";
import {User} from "../../models/user";

export default class AdminServices {
    // check admin password
    static async loginAttempt(userCredentials: User): Promise<boolean | User> {
        const result = await db.query.users.findFirst({
            where: eq(users.email, userCredentials.email ?? '')
        })

        if (result && await checkPassword(userCredentials.password ?? '', result.password)) {
            const {password, adminId, ...rest} = result
            return rest;
        }

        return false
    }
}