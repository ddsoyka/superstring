/**
 * Defines log levels for logging.
 */
export enum Level {
    TRACE,
    DEBUG,
    INFO,
    WARN,
    ERROR
}

export function trace(message: any, ...extra: any) {
    process.env.NODE_ENV === 'development'
        && log(message, Level.TRACE, ...extra);
}

export function debug(message: any, ...extra: any) {
    process.env.NODE_ENV === `development`
        && log(message, Level.DEBUG, ...extra);
}

export function info(message: any, ...extra: any) {
    process.env.NODE_ENV === `development`
        && log(message, Level.INFO, ...extra);
}

export function warn(message: any, ...extra: any) {
    log(message, Level.WARN, ...extra);
}

export function error(message: any, ...extra: any) {
    log(message, Level.ERROR, ...extra);
}

function log(message: any, level: Level, ...extra: any) {
    switch (level) {
        case Level.TRACE:
            extra.length ? console.trace(message, ...extra) : console.trace(message);
            break;
        case Level.DEBUG:
            extra.length ? console.debug(message, ...extra) : console.debug(message);
            break;
        case Level.INFO:
            extra.length ? console.info(message, ...extra) : console.info(message);
            break;
        case Level.WARN:
            extra.length ? console.warn(message, ...extra) : console.warn(message);
            break;
        case Level.ERROR:
            extra.length ? console.error(message, ...extra) : console.error(message);
            break;
        default:
            extra.length ? console.log(message, ...extra) : console.log(message);
            break;
    }
}