import jwt from "jsonwebtoken";
import { jwtSecret, jwtExpires } from "../config/env.js";
import { ResponseError } from "../utils/errResponse.js";

export const generateToken = (req, res, next) => {
    const { username, password } = req.body;
    
    try {
        if (!username || !password) {
            throw new ResponseError("username & password required", 400);
        }

        if (username !== "admin" || password !== "admin123") {
            throw new ResponseError("Invalid credentials", 401);
        }

        const token = jwt.sign(
            { username },
            jwtSecret,
            { expiresIn: jwtExpires }
        );

        res.json({
            message: "Token generated",
            token
        });    
    } catch (error) {
        next(error);
    }
};
