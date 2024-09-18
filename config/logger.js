const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const path = require('path');
const fs = require('fs');

// Define the log directory and file path within /tmp
const logDir = path.join('/tmp', 'logs');
const logFile = path.join(logDir, 'localhost.log');
const errorFile = path.join(logDir, 'error.log');

// Ensure the log directory exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const _simpleFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const _formats = {
    simple: _simpleFormat
};

const _label = 'localhost';

const _transports = {
    console: new transports.Console({ level: 'debug' }),
    logFile: new transports.File({ filename: logFile, level: 'info' }),
    errorFile: new transports.File({ filename: errorFile, level: 'error' })
};

const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: _label }),
        timestamp(),
        _formats.simple
    ),
    transports: [
        _transports.console,
        _transports.logFile,
        _transports.errorFile
    ]
});

module.exports = logger;
