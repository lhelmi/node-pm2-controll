import pm2 from "pm2";

function connectPM2() {
    return new Promise((resolve, reject) => {
        pm2.connect(err => err ? reject(err) : resolve());
    });
}

export async function list() {
    await connectPM2();
    return new Promise((resolve, reject) => {
        pm2.list((err, list) => err ? reject(err) : resolve(list));
    });
}

export async function start(name) {
    await connectPM2();
    return new Promise((resolve, reject) => {
        pm2.start(name, err => err ? reject(err) : resolve());
    });
}

export async function stop(name) {
    await connectPM2();
    return new Promise((resolve, reject) => {
        pm2.stop(name, err => err ? reject(err) : resolve());
    });
}

export async function restart(name) {
    await connectPM2();
    return new Promise((resolve, reject) => {
        pm2.restart(name, err => err ? reject(err) : resolve());
    });
}

export function startServiceByPath(script, name) {
    return new Promise(async (resolve, reject) => {
        try {
            await connect();
            pm2.start({ script, name }, (err) => {
                if (err) return reject(err);
                resolve({ message: `Service '${name}' started from path` });
            });
        } catch (e) {
            reject(e);
        }
    });
}

export function registerService(options) {
    return new Promise(async (resolve, reject) => {
        try {
            await connect();
            pm2.start(options, (err, proc) => {
                if (err) return reject(err);
                resolve({
                    message: `Service '${options.name}' registered`,
                    pm2_process: proc
                });
            });
        } catch (e) {
            reject(e);
        }
    });
}