import dotenv from "dotenv";
dotenv.config();

export const apiKey = process.env.API_KEY;
export const jwtExpires = process.env.JWT_EXPIRES;
export const jwtSecret = process.env.JWT_SECRET;
export const hmacSecret = process.env.HMAC_SECRET;
export const allowedIps = process.env.ALLOWED_IPS.split(",");
export const port = process.env.PORT || 3000;
