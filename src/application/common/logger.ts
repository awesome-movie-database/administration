export interface Logger {
    debug(message: string, obj?: object): void;
    info(message: string, obj?: object): void;
    warning(message: string, obj?: object): void;
    error(message: string, obj?: object): void;
}
