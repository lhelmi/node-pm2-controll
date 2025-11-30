import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";

export default function jwtAuth(req, res, next) {
    const auth = req.headers["authorization"];

    if (!auth) {
        return res.status(401).json({ error: "Missing Authorization header" });
    }

    const token = auth.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Missing token" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
}
