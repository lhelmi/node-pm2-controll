import pm2 from "pm2";
import { promisify } from "util";

const pm2Connect = promisify(pm2.connect).bind(pm2);
const pm2List = promisify(pm2.list).bind(pm2);
const pm2Start = promisify(pm2.start).bind(pm2);
const pm2Stop = promisify(pm2.stop).bind(pm2);
const pm2Restart = promisify(pm2.restart).bind(pm2);

async function ensurePM2Connected() {
    await pm2Connect();
}

export async function list() {
    await ensurePM2Connected();
    return await pm2List();
}

export async function start(name) {
    await ensurePM2Connected();
    return await pm2Start(name);
}

export async function stop(name) {
    await ensurePM2Connected();
    return await pm2Stop(name);
}

export async function restart(name) {
    await ensurePM2Connected();
    return await pm2Restart(name);
}

export async function startServiceByPath(script, name) {
    await ensurePM2Connected();
    await pm2Start({ script, name });
    return { message: `Service '${name}' started from path` };
}

export async function registerService(options) {
    await ensurePM2Connected();
    const proc = await pm2Start(options);
    return {
        message: `Service '${options.name}' registered`,
        pm2_process: proc
    };
}
