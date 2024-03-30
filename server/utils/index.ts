import jwt from "jsonwebtoken";
import { Types } from "mongoose";


export const maxAge = 3 * 24 * 60 * 60;

export const createToken = async(
    id: Types.ObjectId | string, 
    username: string, 
    email: string, 
    admin: boolean
) => {
    return jwt.sign({
        id, username,
        email, admin
    }, process.env.AUTH_SECRET!, { expiresIn: maxAge})
}