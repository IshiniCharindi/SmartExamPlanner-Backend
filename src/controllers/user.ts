import {Request, Response, NextFunction, RequestHandler} from "express";
import UserServices from "../db/services/user";
import {generateToken, COOKIE_NAME} from "../middleware/authorization";

const loginAttempt: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    let proceed = false, message = null, content = null;
    try {
        const result = await UserServices.loginAttempt(req.body);

        if (result === true) {
            // This case shouldn't happen if loginAttempt returns User on success
            message = "Invalid credentials";
            res.status(401).json({
                proceed: false,
                message: message,
                content: null
            });
            return;
        } else if (result) {
            // result is User
            proceed = true;
            message = "Login successful";
            content = result;

            const token = generateToken(content);

            res.cookie(COOKIE_NAME, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 86400000 // 1 day
            });

            const { password, ...userWithoutPassword } = content;

            res.status(200).json({
                proceed: proceed,
                message: message,
                content: userWithoutPassword
            });
        } else {
            message = "Invalid credentials";
            res.status(401).json({
                proceed: false,
                message: message,
                content: null
            });
        }
    } catch (e) {
        next(e);
    }
};

const protectedAccess: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    let proceed = false, message = null, content = null
    try {
        proceed= true
        content = (req as any).user;
        message = "Access granted to protected route"

    } catch (error) {
        message ="Access denied"
        next(error);
    }

    res.status(proceed ? 200 : 401).json({
        proceed: proceed,
        message: message,
        content: content
    })
};

export {loginAttempt, protectedAccess};