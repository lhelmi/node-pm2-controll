import CryptoJS from "crypto-js";
import { hmacSecret } from "../config/env.js";

export default function hmac(req, res, next) {
    const clientSig = req.headers["x-signature"];
    const bodyString = JSON.stringify(req.body);
    const serverSig = CryptoJS.HmacSHA256(bodyString, hmacSecret).toString();
    
    if (clientSig !== serverSig) {
        return res.status(403).json({ error: "Invalid HMAC Signature" });
    }

    next();
}
