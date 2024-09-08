import { Logger as PinoLogger } from "pino";

import { Logger } from "src/application";


export class RealLogger implements Logger {
    constructor(protected readonly pinoLogger: PinoLogger) {}

    debug(message: string, obj?: object): void {
        this.pinoLogger.debug(obj, message)
    }

    info(message: string, obj?: object): void {
        this.pinoLogger.info(obj, message)
    }

    warning(message: string, obj?: object): void {
        this.pinoLogger.warn(obj, message)
    }

    error(message: string, obj?: object): void {
        this.pinoLogger.error(obj,message)
    }
}
