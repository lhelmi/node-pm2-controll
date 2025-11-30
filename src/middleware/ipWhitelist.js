import { allowedIps } from "../config/env.js";

export default function ipWhitelist(req, res, next) {
    const ip = req.ip.replace("::ffff:", "");
    
    if (!allowedIps.includes(ip)) {
        return res.status(403).json({ error: "IP not allowed" });
    }
    next();
}
