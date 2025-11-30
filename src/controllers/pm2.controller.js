import * as pm2Service from "../services/pm2.service.js";
import { ResponseError } from "../utils/errResponse.js";
import logger from "../utils/logger.js";

export async function getServices(req, res, next) {
    try {
        logger.info("PM2 starting service...");
        const list = await pm2Service.list();
        res.json(list);
    } catch (err) {
        logger.error(err, "Failed to list PM2 services");
        next(err);
    }
}

export async function startService(req, res, next) {
    try {
        logger.info({ name: req.params.name }, "Starting service...");
        await pm2Service.start(req.params.name);
        res.json({ message: `Service ${req.params.name} started` });
    } catch (err) {
        logger.error(err, "Failed to start service");
        next(err);
    }
}

export async function stopService(req, res, next) {
    try {
        logger.info({ name: req.params.name }, "Stopping service...");
        await pm2Service.stop(req.params.name);
        res.json({ message: `Service ${req.params.name} stopped` });
    } catch (err) {
        logger.error(err, "Failed to stop service");
        next(err);
    }
}

export async function restartService(req, res, next) {
    try {
        logger.info({ name: req.params.name }, "Restarting service...");
        await pm2Service.restart(req.params.name);
        res.json({ message: `Service ${req.params.name} restarted` });
    } catch (err) {
        logger.error(err, "Failed to restart service");
        next(err);
    }
}

export const startByPath = async (req, res) => {
    try {
        const { script, name } = req.body;
        if (!script || !name) throw new ResponseError("script & name required", 400);
        logger.info({ script, name }, "Start service by path");
        const result = await pm2Service.startServiceByPath(script, name);
        res.json(result);
    } catch (err) {
        logger.error(err, "Failed startByPath");
        res.status(500).json({ error: err.message });
    }
};

export const registerApp = async (req, res) => {
    try {
        logger.info(req.body, "Registering new PM2 service...");
        const result = await pm2Service.registerService(req.body);
        res.json(result);
    } catch (err) {
        logger.error(err, "Failed to register app");
        res.status(500).json({ error: err.message });
    }
};