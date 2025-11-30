import { apiKey } from "../config/env.js";

export default function apiKeyMiddleware(req, res, next) {
    const key = req.headers["x-api-key"];
    if (!key || key !== apiKey) {
        return res.status(403).json({ error: "Forbidden: Invalid API Key" });
    }
    next();
}
