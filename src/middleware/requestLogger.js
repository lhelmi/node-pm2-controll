import logger from "../utils/logger.js";

export function requestLogger(req, res, next) {
    logger.info({
        method: req.method,
        url: req.url,
        body: req.body
    }, "Incoming request");

    next();
}