export interface CommandProcessor<C, R> {
    process(command: C): Promise<R>;
}
