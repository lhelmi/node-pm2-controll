import * as pm2Service from "../services/pm2.service.js";
import { ResponseError } from "../utils/errResponse.js";

export async function getServices(req, res, next) {
    try {
        const list = await pm2Service.list();
        res.json(list);
    } catch (err) {
        next(err);
    }
}

export async function startService(req, res, next) {
    try {
        await pm2Service.start(req.params.name);
        res.json({ message: `Service ${req.params.name} started` });
    } catch (err) {
        next(err);
    }
}

export async function stopService(req, res, next) {
    try {
        await pm2Service.stop(req.params.name);
        res.json({ message: `Service ${req.params.name} stopped` });
    } catch (err) {
        next(err);
    }
}

export async function restartService(req, res, next) {
    try {
        await pm2Service.restart(req.params.name);
        res.json({ message: `Service ${req.params.name} restarted` });
    } catch (err) {
        next(err);
    }
}

export const startByPath = async (req, res) => {
    try {
        const { script, name } = req.body;
        if (!script || !name) throw new ResponseError("script & name required", 400);
        const result = await pm2Service.startServiceByPath(script, name);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const registerApp = async (req, res) => {
    try {
        const result = await pm2Service.registerService(req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};