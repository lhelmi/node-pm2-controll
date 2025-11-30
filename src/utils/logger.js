import pino from "pino";
import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

function getLogFile() {
    const d = new Date();
    const file = `app-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}.log`;
    return path.join(logDir, file);
}

const fileLogger = pino(
    {
        level: "info",
        timestamp: pino.stdTimeFunctions.isoTime
    },
    pino.destination({
        dest: getLogFile(),
        append: true,
        mkdir: true,
        sync: false
    })
);

const consoleLogger = pino({
    transport: {
        targets: [
            {
                target: "pino-pretty",
                level: "info",
                options: { colorize: true }
            }
        ]
    }
});

const logger = {
    info: (...args) => {
        fileLogger.info(...args);
        consoleLogger.info(...args);
    },
    warn: (...args) => {
        fileLogger.warn(...args);
        consoleLogger.warn(...args);
    },
    error: (...args) => {
        fileLogger.error(...args);
        consoleLogger.error(...args);
    }
};

function cleanupOldLogs() {
    const now = Date.now();
    const files = fs.readdirSync(logDir);

    files.forEach(file => {
        const filePath = path.join(logDir, file);
        const stat = fs.statSync(filePath);
        const ageDays = (now - stat.mtimeMs) / (1000 * 60 * 60 * 24);

        if (ageDays > 7) {
            fs.unlinkSync(filePath);
            consoleLogger.info(`Deleted old log: ${file}`);
        }
    });
}

cleanupOldLogs();

export default logger;
