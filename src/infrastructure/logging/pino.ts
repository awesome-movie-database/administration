import { Logger as PinoLogger, pino } from "pino";

import { OperationId } from "src/application";


export function pinoRootLoggerFactory(): PinoLogger {
    return pino()
}


export function pinoLoggerFactory(
    rootPinoLogger: PinoLogger,
    operationId: OperationId,
): PinoLogger {
    return rootPinoLogger.child({"operation_id": operationId})
}
