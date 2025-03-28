import { createLogger, format, transports } from 'winston';
import path from 'path';
import fs from 'fs';
import { env } from '@/utils';

const { LOG_FLUSH_INTERVAL = 60000 } = env;

const { combine, timestamp, printf } = format;

// Determine the project root directory
const logDirectory = path.join('logs');

// Create log directory if it doesn't exist
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} - [${level}]: ${message}`;
});

const today = new Date();
const year = today.getFullYear();
const month = today.toLocaleString('default', { month: 'short' });
const day = String(today.getDate()).padStart(2, '0');

const logFileName = `${year}-${month}-${day}.system.log`;

const logger = createLogger({
    level: 'debug', // Capture all levels
    format: combine(timestamp(), myFormat),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: path.join(logDirectory, logFileName),
            maxsize: 5242880, // 5MB
            maxFiles: 100,
            tailable: true,
            colorize: true,
        }),
    ],
});

logger.logOnDevelopment = (message) => {
    if (env.NODE_ENV === 'dev') {
        logger.info(message);
    }
};

logger.errorOnDevelopment = (message) => {
    if (env.NODE_ENV === 'dev') {
        logger.error(message);
    }
};

export default logger;
