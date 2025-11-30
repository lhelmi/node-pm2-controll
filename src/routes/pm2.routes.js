import { Router } from "express";

import apiKey from "../middleware/apiKey.js";
import jwtAuth from "../middleware/jwtAuth.js";
import hmac from "../middleware/hmac.js";
import rateLimit from "../middleware/rateLimit.js";
import ipWhitelist from "../middleware/ipWhiteList.js";

import {
    getServices, startService, stopService,
    restartService, startByPath, registerApp
} from "../controllers/pm2.controller.js";
const router = Router();

router.use(ipWhitelist);
router.use(apiKey);
router.use(jwtAuth);
// router.use(hmac);
router.use(rateLimit);

router.get("/services", getServices);
router.post("/start/:name", startService);
router.post("/stop/:name", stopService);
router.post("/restart/:name", restartService);
router.post("/start-path", startByPath);
router.post("/register", registerApp);

export default router;
